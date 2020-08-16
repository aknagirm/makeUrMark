const express =require('express')
const mongoose =require('mongoose')
const Reference =require('../models/faculty-student-references-model')
const verifyRequest=require('../routes/verify-token')

const router =express.Router()

router.post('/newReference',verifyRequest, (req,res) => {
    refBody=req.body
    refBody.userName=req.userName
    refBody.userRole=req.userRole
    
    let reference =new Reference(refBody)
    reference.save((err, ref)=>{
        if(err){
            res.status(500).send({msg:"Input not valid"})
        } else {
            res.status(200).send({ref: ref})
        }
    })
})

module.exports = router