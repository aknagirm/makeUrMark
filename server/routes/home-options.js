const express =require('express')
require('dotenv').config()

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

module.exports = router