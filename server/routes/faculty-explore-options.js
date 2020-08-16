const express=require('express');
const shortId= require('shortid')
const multer = require('multer');
const Material =require('../models/material-upload')
const TestResult =require('../models/test_schedule_result')
const verifyRequest =require('../routes/verify-token')


const storage =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/materials/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const upload =multer({storage: storage})
const router =express.Router()


router.post('/materialUpload',verifyRequest, upload.single('selectedMaterial'), (req,res)=>{
    details=JSON.parse(req.body.payload)
    details.userName=req.userName
    details.userRole=req.userRole
    details.selectedMaterial =req.file.path
    let material =new Material(details)
    material.save((err, material)=>{
        if(err){
            console.log(err)
            res.status(500).send({msg:"Input not valid"})
        } else {
            res.status(200).send({msg:"File has been uploaded",material: material})
        }
    })
})

router.post('/scheduleTest',verifyRequest, (req,res) => {
    details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    searchedDay= new Date(details.testDateTime)
    let testObj=new TestResult(details)
    testObj.testId=shortId.generate()
    testObj.save((err,test)=> {
        if(err){
            res.status(500).send({msg: "Input not valid"})
        } else {
            res.status(200).send({msg: "Test scheduled", details: test})
        }
    })
})

router.post('/getTestIds',verifyRequest, (req, res) => {
    let details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    let nextDate= new Date(details.testDate)
    searchedDay= new Date(details.testDate)
    nextDate.setDate(nextDate.getDate() + 1)
    
    TestResult.find({userName: details.userName, grade: details.grade,
        subject: details.subject, testDateTime: {$gte: searchedDay,
        $lt: nextDate} }, (err, test)=> {
            if(err) {
                res.status(500).send({msg: "Input not valid"})
            } else {
                res.status(200).send({details: test})
            }
        })
})

router.post('/getTestDetailsWithId',verifyRequest, (req,res) => {
    let testIdObj =req.body 

    TestResult.findOne({testId: testIdObj.testId}, (err, test) => {
        if(err || test == null) {
            res.status(500).send({msg: "No Test Found"})
        } else {
            if(test.userName == req.userName){
                res.status(200).send({details: test})
            } else {
                res.status(401).send({msg: "You are not authorized for this test"})
            }
            
        }
    })
})

router.post('/updateTestMarks',verifyRequest, (req,res) => {
    let details= req.body
    details.obtainedMarks.forEach(element => {
        TestResult.findOneAndUpdate({testId: details.testId, 'result.userName': element.userName},
        {'$set': {'result.$.marks': element.marks}}, {useFindAndModify: false}, (err, newObj)=>{
            if(err){
                res.status(500).send({msg: "Check Input or check with admin"})
            } else {
                res.status(200).send()
            }
        })
    });
})

module.exports = router