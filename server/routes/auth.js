const express =require('express')
const mongoose =require('mongoose')
const shortId= require('shortid')
const jwt =require('jsonwebtoken')
const multer =require('multer')
const storage =multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload =multer({storage: storage})
require('dotenv').config()

const User =require('../models/user')

const router =express.Router()
const userDb = process.env.MONGOOSE_CONNECTION


/********************************** DB connection ***********************************/

mongoose.connect(userDb, { useNewUrlParser: true, useUnifiedTopology: true }, err=> {
        if(err){
            console.error('Erros!'+ err)
        }else{
            console.log('connected to userdb')
      }
    }
)

/********************************** Register a User ***********************************/

router.post('/register', (req,res)=>{
    let userData =req.body
    userData.secretKey=shortId.generate()
    console.log(userData,req.body)
    let user =new User(userData)
    user.save((err, user)=>{
        if(err){
            res.status(500).send({msg:"Input not valid"})
        } else {
            let payload={userId: user._id}
            let secret =user.secretKey
            let token =jwt.sign(payload, secret)
            res.status(200).send({msg:"new user created", token: token, name:user.firstName, role: user.role})
        }
    })
})


/********************************* Register a faculty *******************************************/


router.post('/facultyRegister', upload.single('selectedCVFile'), (req,res)=>{
    facultyDet=JSON.parse(req.body.payload)
    facultyDet.selectedCVFile =req.file.path
    console.log(facultyDet,req.file)
    let faculty =new User(facultyDet)
     faculty.save((err, user)=>{
        if(err){
            console.log(err)
            res.status(500).send({msg:"Input not valid"})
        } else {
            let payload={userId: user._id}
            let secret = process.env.SECRET_KEY
            let token =jwt.sign(payload, secret)
            res.status(200).send({msg:"new user created", token: token, name:user.firstName, role: user.role})
        }
    })
})




router.post('/allFaculties', (req,res) => {
    let gradeBoard = req.body
    
    User.find({$and: [{role:"faculty"},{grade:gradeBoard.grade},{schoolboard:gradeBoard.board}]},
            (err, facultyList) => {
                if(err){
                    res.status(500).send("no faculty found")
                } else {
                    res.status(200).send({facultyList})
                }
            })
    
})


module.exports = router