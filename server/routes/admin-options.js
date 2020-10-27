const express =require('express')
const verifyRequest=require('./verify-token')
const AllGradeSubject =require('../models/all-grades-subjects')
const Holiday =require('../models/holiday-list')
const ScheduledBatch =require('../models/scheduled-batch-model')
const User=require('../models/user')
const router =express.Router()
require('dotenv').config()


/* function adminCheck(req,res, next){
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
        next()
    }
} */

router.post('/addGradeSubBoard',verifyRequest,(req,res) => {
    let details=req.body
    details.createdDate=new Date()
    details.createdBy=req.userName
    
    let board =new AllGradeSubject(details)
    board.save(details, (err,newBoard) => {
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({newBoard})
        }
    })
})

router.post('/addHoliday', verifyRequest,(req,res)=> {
    let details=req.body
    let searchedDay= new Date(details.holidayDate)
    Holiday.findOneAndUpdate({holidayDate: searchedDay},{$set:{event: details.event}},{upsert: true, new: true},(err,holiday) => {
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({holiday})
        }
    })
})

router.get('/getHolidayList', (req,res) => {
    startDate=new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    Holiday.find({holidayDate:{$gte:startDate}}, (err,holidayList)=> {
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({holidayList})
        }
    })
})

router.post('/holidayDelete',verifyRequest,(req,res)=> {
    let details=req.body
    Holiday.findByIdAndDelete(details._id, (err,doc) => {
        console.log(doc)
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({msg: "Deleted successfully"})
        }
    })
})


router.post('/commonDelete', verifyRequest,(req,res) => {
    let errorFlag=false
    let docList=req.body
    console.log("doclist",docList)
    docList.forEach(doc=> {
        AllGradeSubject.findByIdAndDelete(doc._id, (err,doc) => {
            console.log("in loop",doc)
            if(err){
                errorFlag=true
                res.status(500).send({msg:"something is wrong"})
            } else {
                errorFlag=false
            }
        })
    })
    errorFlag==false?
    res.status(200).send({msg:`${docList[0].docType} Deleted successfully`}): ''
})

router.post('/scheduleBatch',verifyRequest,(req,res)=> {
    let details=req.body
    details.createdBy=req.userName
    details.createdDate=new Date()
    let batch=new ScheduledBatch(details)
    batch.save((err,batch)=>{
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({batch})
        }
    })
})

router.get('/allScheduledBatch',verifyRequest,(req,res)=> {
    ScheduledBatch.find((err,scheduledBatchList)=>{
        if(err){
            res.status(500).send({msg: "Unauthorized"})
        } else {
            res.status(200).send({scheduledBatchList})
        }
    })
})

router.post('/addStudentToBatch', verifyRequest,async (req,res)=> {
    try{
       let details=req.body
       const course= await ScheduledBatch.findById(details.batchId)
      // console.log(course.userList.length,details.userList.length,course.maxStudent)
       if(course.userList.length+details.userList.length>course.maxStudent){
            //res.status(500).send({msg:"Batch Maximum Count Overflowed"})
            const err = new Error();
            err.code="BATCH_SIZE_EXCEEDED"
            throw err
        } else {
            for(let user of details.userList){
               // user.createdDate=new Date()
               // user.createdBy=req.userName
                dt1=new Date((new Date()).setHours(0,0,0))
                console.log(dt1)
                user.startDate=new Date(dt1.setDate(dt1.getDate()+1))
                  user.mappedBy=req.userName
                user.mappedDate=new Date()
                dt=new Date()
                user.endDate=new Date(dt.setDate(dt.getDate()+user.duration))
                course.userList.push(user)
                await User.findOneAndUpdate({userName: user.userName,'courses._id':user.courseObjId},
                {$set:{'courses.$.status':"allocated"}},{useFindAndModify: false})
                await course.save() 
            }
        }
        res.status(200).send({msg:"users has been allocated"})
        
    } catch(err){
        console.log(err)
        if(err.code=="BATCH_SIZE_EXCEEDED") {
            res.status(500).send({msg:"Max batch Size crossed"})
        } else {
            res.status(500).send({msg:"Something is wrong"})
        }
    }
})


router.post('/removeFromBatch',verifyRequest,async (req,res)=>{
    try{
        let details=req.body
        const course= await ScheduledBatch.findOne({_id:details.batchId}).exec()
        for(const user of details.userList){
            for(const courseUser of course.userList){
                let idx=course.userList.indexOf(courseUser)
                if(courseUser._id==user._id){
                    sDate=courseUser.startDate
                    course.userList.splice(idx,1)
                }
                await course.save()
                const userDoc= await User.findOne({userName: user.userName}).exec()
                userDoc.courses.forEach(eachCourse=>{
                    if(eachCourse._id==user.courseObjId) {
                        eachCourse.status="waiting"
                       // sDate=new Date(sDate)
                       // cDate=new Date()
                       // const diffTime = Math.abs(cDate - sDate);
                       // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
                       // eachCourse.duration=eachCourse.duration-diffDays
                    }
                })
                userDoc.facultyGrade=undefined
                userDoc.certification=undefined
                userDoc.educationalDet=undefined
                userDoc.teachingExp=undefined
                userDoc.reference=undefined
                userDoc.subjects=undefined
                await userDoc.save()
            }
        }
        res.status(200).send({msg:"Users Removed"})
    } catch(err){
        console.log(err)
        res.status(500).send({msg:"Something is wrong"})
    }
   
})

router.post('/deleteBatch',verifyRequest,async (req,res)=>{
    details=req.body
    ScheduledBatch.findByIdAndDelete(details._id,(err,doc)=>{
        if(err){
            res.status(500).send({msg:"Something is wrong"})
        } else {
            res.status(200).send({msg:"Batch has been deleted"})
        }
    })
})
 

module.exports =router