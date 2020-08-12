const express= require('express')
const mongoose= require('mongoose')
require('dotenv').config()
const SubjectDet =require('../models/subject-det-model')
const AllGradesSubs =require('../models/all-grades-subjects')

const router =express.Router()


router.post('/subjectDetails', (req, res) => {
    let gradeBoard = req.body
    console.log(gradeBoard)

    SubjectDet.find({$and: [{grade:gradeBoard.grade},{board:gradeBoard.board}]}, (err,subjectList)=> {
        if(err){
            res.status(500).send("no subject found")
        } else {
            res.status(200).send({subjectList})
        }
    })
    
})

router.post('/addSubject', (req,res) => {
    let newSubject= req.body
    let subject =new SubjectDet(newSubject)
    subject.save((err, subject) => {
        if(err) {
            res.status(500).send("Invalid data")
        } else {
            res.status(200).send({subject})
        }
    })
})

router.get('/allGradesSubs', (req,res)=> {
    AllGradesSubs.find({name: "allGradesSubjects"},(err, gradeList) => {
        if(err) {
            res.status(500).send("Connection error")
        } else {
            res.status(200).send({gradeList})
        }
    })
})


module.exports = router