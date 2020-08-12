const express =require('express')
const mongoose =require('mongoose')
const Reference =require('../models/faculty-student-references-model')
const router =express.Router()

router.post('/newReference', (req,res) => {
    refBody=req.body
    console.log(req.body)
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