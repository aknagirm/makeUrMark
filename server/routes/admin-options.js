const express =require('express')
const verifyRequest=require('./verify-token')
const AllGradeSubject =require('../models/all-grades-subjects')
const Holiday =require('../models/holiday-list')
const router =express.Router()
require('dotenv').config()


router.post('/addGradeSubBoard',verifyRequest, (req,res) => {
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
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
    }
})

router.post('/addHoliday', verifyRequest, (req,res)=> {
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
        let details=req.body
        let searchedDay= new Date(details.holidayDate)
        Holiday.findOneAndUpdate({holidayDate: searchedDay},{$set:{event: details.event}},{upsert: true, new: true},(err,holiday) => {
            if(err){
                res.status(500).send({msg:"something is wrong"})
            } else {
                res.status(200).send({holiday})
            }
        })
    }
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
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
        let details=req.body
        Holiday.findByIdAndDelete(details._id, (err,doc) => {
            console.log(doc)
            if(err){
                res.status(500).send({msg:"something is wrong"})
            } else {
                res.status(200).send({msg: "Deleted successfully"})
            }
        })
    }
})


router.post('/commonDelete', verifyRequest, (req,res) => {
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
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
    }
})

module.exports =router