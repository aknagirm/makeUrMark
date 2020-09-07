const express =require('express')
const verifyRequest=require('./verify-token')
const AllGradeSubject =require('../models/all-grades-subjects')
const router =express.Router()
require('dotenv').config()


router.post('/addGradeSubBoard',verifyRequest, (req,res) => {
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
       let details=req.body
       details.createdDate=new Date()
       details.createdBy=req.userName
       
       console.log(details)
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

router.post('/deleteGradeSubBoard', verifyRequest, (req,res) => {
    if(req.userRole !="owner") {
        res.status(401).send({msg: "Unauthorized"})
    } else {
        AllGradeSubject.findByIdAndDelete(req.body._id, (err,doc) => {
            if(err){
                res.status(500).send({msg:"something is wrong"})
            } else {
                res.status(200).send({msg:`${req.body.docType} Deleted successfully`})
            }
        })
    }
})

module.exports =router