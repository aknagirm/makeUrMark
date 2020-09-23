const express=require('express');
const shortId= require('shortid')
const multer = require('multer');
const fs = require('fs')
const TestResult =require('../models/test_schedule_result')
const User =require('../models/user')
const verifyRequest =require('../routes/verify-token')


const router =express.Router()


router.post('/addCourses',verifyRequest, (req,res)=> {
    details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    errFlag=false
    details.courseList.forEach(course=>{
        if(details.userRole && details.userRole=='student') {
            User.findOne({userName:req.userName},(err,userFound)=> {
                if(err){
                    res.status(404).send({msg:"User not found"})
                } else {
                    userFound.facultyGrade=undefined
                    userFound.certification=undefined
                    userFound.educationalDet=undefined
                    userFound.teachingExp=undefined
                    userFound.reference=undefined
                    userFound.subjects=undefined
                    userFound.admissionDate=new Date()
                    const index=userFound.courses.findIndex(sub=>{
                        return (sub.board==course.board && sub.grade==course.grade
                        && sub.subject==course.subject && sub.batchType==course.batchType)
                        })
                    if(index!=-1){
                        prevDuration=+userFound.courses[index].duration
                        newDuration=+course.duration
                        userFound.courses[index].duration=prevDuration+newDuration
                        
                        userFound.save((err,doc)=>{
                                if(err){
                                    console.log(err)
                                    errFlag=true
                                    res.status(500).send({msg:'something is wrong'})
                                } else {
                                    errFlag=false
                                }
                            })
                    } else {
                        userFound.courses.push(course)
                        userFound.save((err,doc)=>{
                            if(err){
                                console.log(err)
                                errFlag=true
                                res.status(500).send({msg:'something is wrong'})
                            } else {
                                errFlag=false
                            }
                        })
                    }
                }
            })
            
        } else {
            res.status(401).send({msg: "Unauthorized"})
        }
    })
    
    if(!errFlag){
        res.status(200).send({msg: "ok"})
    }
})

router.post('/getTestForGradeSub',verifyRequest, (req,res) => {
    details=req.body
    details.userName=req.userName
    details.userRole=req.userRole
    if(details.userRole && details.userRole=='student'){
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
        } else {
            TestResult.find({testDateTime: {$gt:new Date()}, grade:details.grade}, (err, list) => {
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
        }
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
})

router.post('/registerForTest',verifyRequest,(req,res) => {
    var isError=false
    userRole=req.userRole
    if(userRole=='student'){
    details=req.body
    userName=req.userName
    firstName=req.firstName
    lastName=req.lastName
    details.forEach(eachTest => {
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
    } else {
        res.status(401).send({msg:'Unacuthorized'})
    }
})


module.exports = router