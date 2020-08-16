const express = require('express')
const nodemailer = require('nodemailer');
const twilioModel=  require('../models/twilio')
const fetch = require("node-fetch")
require('dotenv').config()
const twilio =require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

const router=express.Router()

router.post('/mobOtpSend', (req,res) => {
    twilio.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({
        to: `+${req.body.contactNumber}`,
        channel: req.body.channel
    }).then(data =>{
        res.status(200).send("OTP Sent")
    }, err => {
        console.log(err)
        res.status(500).send("check phone number")
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


router.post('/mailOtp', (req, res)=>{

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
    <p>This OTP is valid for next 4 min only.</p>
    <br>
    <p>Regards</p>
    <p>MakeURMark</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(500).send("need to check email id")
    } else {
        res.status(200).send({"mailOtp":val})
    }
    });
})

router.post('/captcha',async (req,res) => {
    if(req.body.captcha === undefined || 
      req.body.captcha === '' ||
      req.body.captcha === null) {
        res.send({msg:"no captcha"})
      }
  
      secretKey=process.env.CAPTCHA_SECRET


      //await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
      
      const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`, {
          method: "POST"
      })
      .then(_res => _res.json())
  
      console.log(captchaVerified)
    
      // If not successful
      if (captchaVerified.success !== undefined && !captchaVerified.success)
        return res.json({ success: false, msg: 'Failed captcha verification' });
    
      // If successful
      return res.json({ success: true, msg: 'Captcha passed' });
  })

module.exports = router