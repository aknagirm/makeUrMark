const express = require('express')
const nodemailer = require('nodemailer');
const twilioModel=  require('../models/twilio')
const User =require('../models/user')
const fetch = require("node-fetch")
require('dotenv').config()
const twilio =require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

const router=express.Router()

router.post('/mobOtpSend', (req,res) => {
    twilio.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({
        to: `${req.body.contactNumber}`,
        channel: req.body.channel
    }).then(data =>{
        res.status(200).send({msg:"OTP Sent"})
    }, error => {
        console.log(error)
        res.status(500).send({msg:"Check Phone Number"})
    })
})

router.post('/mobOtpVerify', (req,res) => {
    twilio.verify.services(process.env.TWILIO_SERVICE_ID).verificationChecks.create({
        to: req.body.contactNumber,
        code: req.body.code
    }).then(data => {
        res.status(200).send({"status":data.status})
    })
})


router.post('/mailOtp', async (req, res)=>{
    try {
        let user=await User.findOne({userName: req.body.email}).exec()
        if(user) {
            let err=new Error()
            err.code="USER_EXIST"
            throw err
        } else {
            var val = Math.floor(100000 + Math.random() * 900000);
            
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
    
                var mailOptions = {
                from: process.env.MAIL_USER,
                to: req.body.email,
                subject: 'OTP for MakeUrMark mail verification',
                html:
                `<p>Hi</p>
                <br>
                <p>Thanks for choosing MakeUrMark. This is just a automailer. Your mail OTP is: <strong>${val}</strong>.</p>
                <p>This OTP is valid for next 2 min only.</p>
                <br>
                <p>Regards</p>
                <p>MakeURMark</p>`
            };
    
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                let err=new Error()
                err.code="UNKNOWN_MAIL_ID"
                throw err
            } else {
                res.status(200).send({"mailOtp":val})
            }
            });
        }

    } catch(err){
        if(err.code=="UNKNOWN_MAIL_ID"){
            res.status(500).send({msg:"need to check email id"})
        } else if(err.code=="USER_EXIST") {
            res.status(500).send({msg:"Email Id already Registered"})
        } else {
            res.status(500).send({msg:"Something is wrong"})
        }
    }
})

router.post('/captcha',async (req,res) => {
    try{
    if(req.body.captcha === undefined || 
      req.body.captcha === '' ||
      req.body.captcha === null) {
        res.send({msg:"no captcha"})
      }
      secretKey=process.env.CAPTCHA_SECRET
      //await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
      const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`, {
          method: "POST"
      }).then(_res => _res.json())
      console.log(captchaVerified)
      // If not successful
      if (captchaVerified.success !== undefined && !captchaVerified.success){
        const err = new Error('Failed captcha verification');
        err.code="FAILED_VERIFICATION"
        throw err
      }
        //return res.json({ success: false, msg: 'Failed captcha verification' });
      // If successful
      return res.json({ success: true, msg: 'Captcha passed' });
    } catch(err){
        console.log(err)
        res.status(500).send({msg: 'Failed captcha verification' })
    }
  })

module.exports = router