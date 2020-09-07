const express =require('express')
const shortId= require('shortid')
const mongoose =require('mongoose')
const Reference =require('../models/faculty-student-references-model')
const verifyRequest=require('../routes/verify-token')
const nodemailer = require('nodemailer');
const router =express.Router()
require('dotenv').config()

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});



router.post('/newReference',verifyRequest, (req,res) => {
    refBody=req.body
    refBody.userName=req.userName
    refBody.userRole=req.userRole

    Reference.find({emailId:refBody.emailId}, (err, user) => {
        if(err) {
            res.status(500).send({msg:"Something is worng"})
        } else {
                let reference =new Reference(refBody)
                reference.refId=shortId.generate()
                reference.save((err, ref)=>{
                    if(err){
                        res.status(500).send({msg:"Input not valid"})
                    } else {

                        var mailList=[
                            refBody.emailId,
                            refBody.userName
                        ]
                        
                        var mailOptions = {
                            from: process.env.MAIL_USER,
                            to: mailList,
                            subject: `Reference for new ${req.userRole}`,
                            html:
                            `<p>Hi ${refBody.firstName}</p>
                            <br>
                            <p>We have received your details from <strong>${refBody.userName}</strong> for a 
                            <strong>${refBody.userRole}</strong> role in our organization. 
                            The reference code for you is: <strong>${reference.refId}</strong>.</p>
                            <p>Please make sure to use this code at the time of registraion, otherwise
                            the reference benefit might not get applied.</p>
                            <p>This is an automailer, so PLEASE DO NOT REPLY, for any query please use our contact us portal
                            </p>
                            <br>
                            <p>Regards</p>
                            <p>MakeURMark</p>`
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                res.status(500).send({msg:"need to check email id"})
                            } 
                            });

                        res.status(200).send({ref: ref})
                    }
                })

        }
    })

})

module.exports = router