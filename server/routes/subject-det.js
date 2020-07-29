const express= require('express')
const mongoose= require('mongoose')
require('dotenv').config()
const SubjectDet =require('../models/subject-det-model')

const router =express.Router()
const userDb = process.env.MONGOOSE_CONNECTION

/********************************** DB connection ***********************************/

mongoose.connect(userDb, { useNewUrlParser: true, useUnifiedTopology: true }, err=> {
        if(err){
            console.error('Erros!'+ err)
        }
    }
)

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


module.exports = router