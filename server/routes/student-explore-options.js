const express=require('express');
const shortId= require('shortid')
const multer = require('multer');
const fs = require('fs')
const TestResult =require('../models/test_schedule_result')
const User =require('../models/user')
const ScheduledBatch =require('../models/scheduled-batch-model')
const Material =require('../models/material-upload')
const verifyRequest =require('../routes/verify-token')


const router =express.Router()

/* function studentCheck(req,res, next){
    if(req.userRole && req.userRole !="student") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
        next()
    }
} */

router.post('/addCourses',verifyRequest, async (req,res)=> {
    try{
        details=req.body
        details.userName=req.userName
        details.userRole=req.userRole
        let userFound=await User.findOne({userName:req.userName}).exec()
        if(!userFound){
            let err=new Error('No_User_Found')
            throw err
        } else {
            userFound.facultyGrade=undefined
            userFound.certification=undefined
            userFound.educationalDet=undefined
            userFound.teachingExp=undefined
            userFound.reference=undefined
            userFound.subjects=undefined
            userFound.walletPoint=userFound.walletPoint-details.deduction
            for(let course of details.courseList){
                const index=userFound.courses.findIndex(sub=>{
                    return (sub.board==course.board && sub.grade==course.grade
                    && sub.subject==course.subject && sub.batchType==course.batchType)
                    })
                if(index!=-1){
                    prevDuration=+userFound.courses[index].duration
                    newDuration=+course.duration
                    userFound.courses[index].duration=prevDuration+newDuration
                } else {
                    course.admissionDate=new Date()
                    course.status='waiting'
                    course.duration=course.duration
                    userFound.courses.push(course)
                }
            }
            await userFound.save()
        }
        res.status(200).send({msg: "ok"})
    } catch(err) {
        console.log(err)
        if(err.message=='No_User_Found'){
            res.status(401).send({msg:'User Not Found'})
        }
        res.status(500).send({msg:'Something is wrong'})
    }
   
})

router.get('/getUnallocatedCourses',verifyRequest, (req,res)=>{
    details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    arr=[]
    User.findOne({userName:req.userName},(err,user)=>{
        if(err){
            console.log(err)
            res.status(500).send({msg:'Something is wrong'})
        } else {
            user.courses.forEach(course=>{
                if(course.status=='waiting'){
                    arr.push(course)
                }
            })
            res.status(200).send({unallocatedList:arr})
        }
    })
})


router.post('/getAllTestForStudent',verifyRequest, async (req,res) => {
    details=req.body
    details.userName=req.userName
    try{
       let testList=await TestResult.find({grade:details.grade,'result.userName':req.userName}).exec()
        let arr=[]
        for(let test of testList){
            let testObj=test.toObject()
            for(let resultObj of testObj.result){
                let highestMarks=0
                highestMarks=resultObj.marks>highestMarks?resultObj.marks:highestMarks
                testObj.highestMarks=highestMarks
                testObj.highestMarksPercentage=(testObj.highestMarks*100)/testObj.fullMarks
                if(resultObj.userName==req.userName){
                   testObj.obtainedMarks=resultObj.marks
                   testObj.obtainedMarksPercentage=(resultObj.marks*100)/testObj.fullMarks
                }
            }
            testObj.result=undefined
            arr.push(testObj)
        }
        res.status(200).send({'testList': arr})
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: "Something is wrong"})
    }
    
})

router.post('/getTestForGradeSub',verifyRequest, async (req,res) => {
    try {
        details=req.body
        details.userName=req.userName
        details.userRole=req.userRole
        currDate=new Date()
        list= await TestResult.find({testDateTime: {$gt:new Date()}, grade:details.grade})

        let testList= list.map(test=> {
            //console.log(test)
            test=test.toJSON()
            test.status=""
            const found=test.result.find(result=>result.userName==req.userName)
            console.log(test,found)
            found?test.status="enrolled":test.status="none"
            return test
        })
        res.status(200).send({"upcomingTest":testList})
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: "Input not valid"})
    }
})
    /* currDate=new Date()
    console.log(details)
    if(details.subject){
        TestResult.find({testDateTime: {$gt:new Date()}, grade:details.grade, 
        subject:details.subject}, (err, list) => {
            if(err){
                res.status(500).send({msg: "Input not valid"})
            } else{
                let testList= list.map(test=> {
                    test=test.toJSON()
                    test.status=""
                    const found=test.result.filter(result=>result.userName=req.userName)
                    found?test.status="enrolled":test.status="none"
                    return test
                })
                console.log(testList)
                res.status(200).send({testList})
            }
        })
    } else { */
        /* TestResult.find({testDateTime: {$gt:new Date()}, grade:details.grade}, (err, list) => {
            if(err){
                res.status(500).send({msg: "Input not valid"})
            } else{
                let testList= list.map(test=> {
                    test=test.toJSON()
                    test.status=""
                    const found=test.result.find(res=>res.userName==res.userName)
                    found?test.status="enrolled":test.status="none"
                    console.log(test,found)
                    return test
                })
                res.status(200).send({testList})
            }
        }) */
        /* TestResult.find({testDateTime: {$gt: {$subtract:[currDate.getTime(),"$duration"*60000]}}}, (err, list) => {
            if(err){
                res.status(500).send({msg: "Input not valid"})
            } else{
                let testList= list.map(test=> {
                    test=test.toJSON()
                    test.status=""
                    const found=test.result.find(res=>res.userName==res.userName)
                    found?test.status="enrolled":test.status="none"
                    console.log(test,found)
                    return test
                })
                res.status(200).send({testList})
            }
        })
    } */


router.post('/registerForTest',verifyRequest,async (req,res) => {
    try{
        userRole=req.userRole
        details=req.body
        userName=req.userName
        firstName=req.firstName
        lastName=req.lastName

        for(let eachTest of details.testList){
            let newTesObj=await TestResult.findByIdAndUpdate(eachTest._id,
                {$push:{result:{userName: userName, firstName: firstName, lastName:lastName, marks: ''}}})
                
        }

        if(details.deduction>0){
            let userFound=await User.findOne({userName:req.userName}).exec()
            if(!userFound){
                let err=new Error('No_User_Found')
                throw err
            } else {
                userFound.facultyGrade=undefined
                userFound.certification=undefined
                userFound.educationalDet=undefined
                userFound.teachingExp=undefined
                userFound.reference=undefined
                userFound.subjects=undefined
                userFound.walletPoint=userFound.walletPoint-details.deduction
                await userFound.save()
            }
        }

        /* details.forEach(eachTest => {
            TestResult.findByIdAndUpdate(eachTest._id,
                {$push:{result:{userName: userName, firstName: firstName, lastName:lastName, marks: ''}}},
                (err,newTesObj)=> {
                    if(err){
                        isError=true
                        res.status(500).send({msg:'something is wrong'})
                    } else {
                        isError=false
                    }
                })
        });
        !isError?res.status(200).send({msg:"Enrolled Successfully"}): res.status(500).send({msg:'something is wrong'})
     */
        res.status(200).send({msg:"Enrolled Successfully"})
    } catch(err){
        console.log(err)
        if(err.message=='No_User_Found'){
            res.status(401).send({msg:'User Not Found'})
        }
        res.status(500).send({msg:'something is wrong'})
    }
 })

router.get('/getAllScheduledBatch',verifyRequest,async (req,res) =>{
   try{
       batchList=[]
        let allBatches=await ScheduledBatch.find().exec()
        for(let batch of allBatches){
            for(let batchUser of batch.userList){
                eDate=new Date(batchUser.endDate.setHours(0,0,0))
                if(batchUser.userName==req.userName && new Date()<=eDate){
                    obj={...batch._doc,...batchUser._doc}
                    obj.userList=undefined
                    batchList.push(obj)
                }
            }
        }
        res.status(200).send({batchList})
   } catch(err) {
       console.log(err)
       res.status(500).send({msg:"Something is wrong"})
   }
    
})

router.get('/getAllMaterial',verifyRequest,async (req,res) =>{
    try{
        arr=[]
        const materialList=await Material.find({}).exec()
        const user=await User.findOne({userName:req.userName}).exec()
        user.courses.forEach(course=>{
            if(course.status!="expired"){
                materialList.forEach(material=>{
                    if(material.grade==course.grade && material.subject==course.subject 
                        && material.materialType=="study"){
                            arr.push(material)
                    }
                })
            }
        })
        res.status(200).send({'materialList':arr})
    } catch(err){
        console.log(err)
        res.status(500).send({msg:"Something is wrong"})
    }
    
})


module.exports = router