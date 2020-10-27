const express =require('express')
const mongoose =require('mongoose')
const shortId= require('shortid')
const jwt =require('jsonwebtoken')
const fs = require('fs')
const verifyRequest =require('../routes/verify-token')
const multer =require('multer')
/* const storage =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}) */

const cvStorage =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/facultyCV/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const userImageStorage =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/user-profile-image/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const uploadFacultyCv =multer({storage: cvStorage})
const uploadUserProfilePic =multer({storage: userImageStorage})
require('dotenv').config()

const User =require('../models/user')

const router =express.Router()
const userDb = process.env.MONGOOSE_CONNECTION
const secretKey =process.env.SECRET_KEY



/********************************** Login a User ***********************************/

router.post('/login',(req,res) => {
    let userData =req.body
    User.findOne({userName: userData.userName}, (err, user) =>{
        if(!user) {
            res.status(402).send({msg:"User not found"})
        } else {
            if (user.password !== userData.password){
                res.status(402).send({msg:"Invalid Password"})
              } else if(!user.activeFlag){
                res.status(402).send({msg:"You are blocked from this site"})
              } else {
                let payload ={_id: user._id, userName: user.userName, userRole: user.userRole,
                                firstName: user.firstName, lastName: user.lastName}
                let token =jwt.sign(payload, secretKey)
                res.status(200).send({token})
              }
        }
    })
})

/********************************** Register a User ***********************************/

router.post('/studentRegister', (req,res)=>{
    let userData =req.body
    userData.userName= userData.email
    userData.creationDate= new Date()
    userData.updateDate=null
    let newUser =new User(userData)
    newUser.facultyGrade=undefined
    newUser.certification=undefined
    newUser.educationalDet=undefined
    newUser.teachingExp=undefined
    newUser.reference=undefined
    newUser.subjects=undefined
    newUser.activeFlag=true
    newUser.courses=[]
    newUser.ownReferCode=shortId.generate()
    newUser.bonusCourseDays=0
    newUser.save((err, user)=>{
        if(err){
            res.status(500).send({msg:"Please Check your internet"})
        } else {
            let payload={_id: user._id, userName: user.userName, userRole: user.userRole,
                        firstName: user.firstName, lastName: user.lastName}
            let token =jwt.sign(payload, secretKey)
            res.status(200).send({msg:"new user created", token: token, name:user.firstName, userRole: user.userRole})
        }
    })
})


/********************************* Register a faculty *******************************************/


router.post('/facultyRegister', uploadFacultyCv.single('selectedCVFile'), (req,res)=>{
    facultyDet=JSON.parse(req.body.payload)
    facultyDet.selectedCVFile =req.file.path
    facultyDet.userName= facultyDet.email
    facultyDet.creationDate= new Date()
    facultyDet.updateDate=null
    let faculty =new User(facultyDet)
    faculty.activeFlag=true
    faculty.status="waiting"
    faculty.courses=undefined
    faculty.referCode=shortId.generate()
    faculty.referCount=0
     faculty.save((err, user)=>{
        if(err){
            console.log(err)
            res.status(500).send({msg:"Input not valid"})
        } else {
            let payload={_id: user._id, userName: user.userName, userRole: user.userRole,
                        firstName: user.firstName, lastName: user.lastName}
            let token =jwt.sign(payload, secretKey)
            res.status(200).send({msg:"new user created", token: token, name:user.firstName, userRole: user.userRole})
        }
    })
})


router.get('/getUserDetails',verifyRequest, (req,res) => {
    let details={userName: req.userName, userRole: req.userRole}
    User.findOne({userName: details.userName}, (err, user)=> {
        if(err){
            res.status(500).send("Something is wrong")
        } else {
            if(user.userRole == details.userRole) {
                res.status(200).send({user})
            } else {
                res.status(402).send("User is not authorized")
            }
        }
    })
})

router.post('/updateProfilePicture', verifyRequest, uploadUserProfilePic.single('selectedImageFile'),
 (req,res) =>{
    User.findOne({userName:req.userName}, (err,user) => {
        if(err){
            res.status(500).send({msg: "Please check inputs"})
        } else {
            user.courses=undefined
            let oldImage=user.selectedImageFile
            if(oldImage){
                fs.unlink(oldImage, (err) =>{
                    if(err) {
                        console.log(err)
                    }
                }) 
            }
            user.updateOne({selectedImageFile: req.file.path, updateDate: new Date()},(err, newUser) => {
                if(err){
                    res.status(500).send({msg: "Please check inputs"})
                } else {
                    res.status(200).send({newUser})
                }
            })
        }
    })

})

router.post('/removeProfilePicture', verifyRequest, (req,res) => {
    fileName = req.body.filePath
    User.findOne({userName: req.userName}, (err,user) => {
        if(err){
            res.status(500).send({msg: "Something is wrong"})
        } else {
            if(user == {}){
                res.status(401).send({msg: "Unauthorized"})
            } else {
                facultyDet.courses=undefined
                let oldImage=user.selectedImageFile
                if(oldImage){
                fs.unlink(oldImage, (err) =>{
                    if(err) {
                        console.log(err)
                    }
                }) 
                }
                user.updateOne({selectedImageFile: null,updateDate: new Date()}, (err, newUser)=> {
                    if(err) {
                        res.status(500).send({msg: "Something is wrong"})
                    } else {
                        res.status(200).send({user})
                    }
                })
                
            }
        }
    })

})


router.post('/updateUserProfile', verifyRequest, (req,res) => {
    let details=req.body
    if(req.userRole=="student"){
        delete details.facultyGrade
        delete details.certification
        delete details.educationalDet
        delete details.teachingExp
        delete details.reference
        delete details.subjects
    }
    if(req.userRole=='faculty'){
        delete details.courses
    }
   if(details.userName==req.userName) {
        details.updateDate=new Date()
        User.findOneAndUpdate({_id: details._id},details,{useFindAndModify: false}, (err, user) => {
            if(err) {
                res.status(500).send({msg: "Please check inputs"})
            } else {
                res.status(200).send({user})
            }
        })
    } else {
        res.status(401).send({msg: "Unauthorized"})
    }
    
})


router.get('/getAllFaculties', (req,res) => {
    User.find({userRole:"faculty"},(err,facultyList)=>{
        if(err){
            res.status(500).send("no faculty found")
        } else {
            res.status(200).send({'facultyList':facultyList})
        }
    })
})

router.get('/getAllStudents',(req,res)=>{
    User.find({userRole:'student'},(err,studentList)=>{
        if(err){
            res.status(500).send({msg:'No Student found'})
        } else {
            res.status(200).send({studentList})
        }
    })
})

router.post('/blockUnblockUser',verifyRequest,async (req,res)=>{
    try{
        let details=req.body
        let user=await User.findById(details._id).exec()
        user.activeFlag=details.newFlag
        if(user.userRole=='faculty'){
            user.courses=undefined
        } else {
            user.facultyGrade=undefined
            user.certification=undefined
            user.educationalDet=undefined
            user.teachingExp=undefined
            user.reference=undefined
            user.subjects=undefined
        }
        await user.save()
        res.status(200).send({user})
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: "Something is wrong"})
    }
})

router.post('/approveFaculty',verifyRequest,(req,res)=>{
    let details=req.body
    User.findByIdAndUpdate(details._id,{$set:{status:"working"}},{useFindAndModify:false},(err,doc)=>{
        if(err){
            res.status(500).send({msg: "Something is wrong"})
        } else {
            res.status(200).send({msg: "Faculty has been approved"})
        }
    })
})

module.exports = router