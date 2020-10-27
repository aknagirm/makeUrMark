const express=require('express');
const shortId= require('shortid')
const multer = require('multer');
const fs = require('fs')
const Material =require('../models/material-upload')
const TestResult =require('../models/test_schedule_result')
const verifyRequest =require('../routes/verify-token')


const storageMaterial =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/materials/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const storageQPaper =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/quetions/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const uploadMaterial =multer({storage: storageMaterial})
const uploadQPaper =multer({storage: storageQPaper})
const router =express.Router()


router.post('/materialUpload',verifyRequest, uploadMaterial.single('selectedMaterial'), (req,res)=>{
    details=JSON.parse(req.body.payload)
    details.uploadedBy=req.userName
    details.userRole=req.userRole
    details.uploadDate=new Date()
    if(req.userRole === 'faculty') {
        details.selectedMaterial =req.file.path
        let material =new Material(details)
        material.materialId=shortId.generate()
        material.save((err, material)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"Input not valid"})
            } else {
                res.status(200).send({msg:"File has been uploaded",material: material})
            }
        })
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.get('/getAllMaterial',verifyRequest,(req,res) => {
    if(req.userRole == 'faculty') {
        Material.find({uploadedBy: req.userName}, (err, materialList) => {
            if(err){
                res.status(500).send({msg: "Input not valid"})
            } else{
                res.status(200).send({materialList})
            }
        })
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.post('/deleteMaterialById', verifyRequest, (req,res) => {
    if(req.userRole == 'faculty') {
        let _id=req.body._id
        let oldImage=req.body.selectedMaterial
        Material.findByIdAndDelete(_id, (err, material) => {
            if(err) {
                res.status(500).send({msg: "No material found for this id"})
            } else {
            if(oldImage){
                fs.unlink(oldImage, (err) =>{
                    if(err) {
                        res.status(500).send({msg: "No material found for this id"})
                    }
                })}
                res.status(200).send({material})
            }
        })
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.post('/scheduleTest',verifyRequest,uploadQPaper.single('selectedQPaper'), async (req,res) => {
    try{      
        details=JSON.parse(req.body.payload)
        details.userName=req.userName
        details.userRole=req.userRole
        details.firstName=req.firstName
        details.lastName=req.lastName
        details.selectedQPaper =req.file.path

        searchedDay= new Date(details.testDateTime)
        let testObj=new TestResult(details)
        testObj.testId=shortId.generate()
        let test=await testObj.save()
        res.status(200).send({msg: "Test scheduled", details: test})
    } catch(err){
        console.log(err)
        res.status(500).send({msg: "Input not valid"})
    }
})

router.get('/getAllScheduledTest',verifyRequest,(req,res) => {
    if(req.userRole == 'faculty') {
        TestResult.find({userName: req.userName, testDateTime: {$gt:new Date()}}, (err, testsList) => {
            if(err){
                res.status(500).send({msg: "Input not valid"})
            } else{
                res.status(200).send({testsList})
            }
        })
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.post('/deleteTestById', verifyRequest, async (req,res) => {
    try{
        let oldImage=req.body.selectedQPaper
        let _id=req.body._id
        let test=await TestResult.findById(_id).exec()
        if(test.result.length==0){
            await test.deleteOne()
            if(oldImage){
                fs.unlink(oldImage, (err) =>{
                    if(err) {
                        let err=new Error()
                        err.code="NO_PAPER"
                        throw err
                    }
                })
            }
            res.status(200).send({test})
        } else {
            let err=new Error()
            err.code="USER_AVL"
            throw err
        }
    } catch(err){
        console.log(err)
        if(err.code=="USER_AVL") {
            res.status(500).send({msg: "There are registered students for this test, please check with admin"})
        } else if(err.code=="NO_PAPER") {
            res.status(500).send({msg: "No material found for this id"})
        } else {
            res.status(500).send({msg: "Something Wrong"})
        }
    }
    
        /* TestResult.findByIdAndDelete(_id, (err, test) => {
            if(err) {
                res.status(500).send({msg: "No test found for this id"})
            } else {
                res.status(200).send({test})
            }
        }) */
    
})

router.post('/scheduleTestUpdate',verifyRequest,uploadQPaper.single('selectedQPaper'),async (req,res)=>{
    try{      
        details=JSON.parse(req.body.payload)

        searchedDay= new Date(details.testDateTime)
        let testObj=await TestResult.findOne({_id:details._id}).exec()
        if(req.file && testObj.selectedQPaper==''){
            testObj.selectedQPaper=req.file.path
        } else if(req.file && testObj.selectedQPaper!==''){
            let oldImage=testObj.selectedQPaper
            if(oldImage){
                fs.unlink(oldImage, (err) =>{
                    if(err) {
                        let err=new Error()
                        err.code="NO_PAPER"
                        throw err
                    }
                })
                testObj.selectedQPaper=req.file.path
            }
        }

        if(details.selectedDate){
            newDate= new Date(details.selectedDate)
            testObj.testDateTime=newDate
        }
        
        let test=await testObj.save()
        res.status(200).send({msg: "Scheduled Test Updated", details: test})
    } catch(err){
        console.log(err)
        res.status(500).send({msg: "Input not valid"})
    }
})

router.post('/getTestIds',verifyRequest, (req, res) => {
    let details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    if(req.userRole === 'faculty') {
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
        } else {
            res.status(401).send({msg: "Unauthorized"})
        }
})

router.post('/getTestDetailsWithId',verifyRequest, (req,res) => {
    let testIdObj =req.body 
    if(req.userRole === 'faculty') {
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
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.post('/updateTestMarks',verifyRequest, (req,res) => {
    let details= req.body
    if(req.userRole === 'faculty') {
        details.obtainedMarks.forEach(element => {
            TestResult.findOneAndUpdate({testId: details.testId, 'result.userName': element.userName},
            {'$set': {'result.$.marks': element.marks}}, {useFindAndModify: false}, (err, newObj)=>{
                if(err){
                    res.status(500).send({msg: "Check Input or check with admin"})
                } else {
                    res.status(200).send({msg: "Marks Updated"})
                }
            })
        });
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

module.exports = router