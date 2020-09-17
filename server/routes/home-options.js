const express =require('express')
require('dotenv').config()

const AllGradeSubject =require('../models/all-grades-subjects')
const User =require('../models/user')

const router =express.Router()

router.get('/getAllFaculties', (req,res) => {
    User.find({userRole:"faculty"}, (err,faculties)=> {
        if(err) {
            res.status(500).send({msg: "Something is worng"})
        } else {
            res.status(200).send({faculties})
        }
    })
})

router.post('/getDetails', (req,res) => {
    let seacrhedFor=req.body
    AllGradeSubject.find({docType: seacrhedFor.docType}, (err,details) => {
        if(err){
            res.status(500).send({msg:"something is wrong"})
        } else {
            res.status(200).send({details})
        }
    })
})

module.exports = router