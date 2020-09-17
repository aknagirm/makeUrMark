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