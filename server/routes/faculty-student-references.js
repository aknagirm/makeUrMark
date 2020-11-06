const express =require('express')
const shortId= require('shortid')
const mongoose =require('mongoose')
const Reference =require('../models/faculty-student-references-model')
const verifyRequest=require('../routes/verify-token')
const nodemailer = require('nodemailer');
const router =express.Router()
const User =require('../models/user')
const PaymentDetails= require('../models/order-payment-history')
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



router.post('/newReference',verifyRequest,async (req,res) => {
    refBody=req.body
    refBody.userName=req.userName
    refBody.userRole=req.userRole

    try{
        let user=await User.findOne({userName: refBody.userName}).exec()
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
            The reference code for you is: <strong>${user.ownReferCode}</strong>.</p>
            <p>Please make sure to use this code at the time of registraion, otherwise
            the reference benefit might not get applied.</p>
            <p>This is an automailer, so PLEASE DO NOT REPLY, for any query please use our contact us portal
            </p>
            <br>
            <p>Regards</p>
            <p>MakeURMark</p>`
        };

        transporter.sendMail(mailOptions, function(err, info){
            if (err) {
               //let err=new Error()
               throw err
            } else {
                res.status(200).send({msg:"Reffered Successfully"})
            }
            });

    }catch(err) {
        console.log(err)
        res.status(500).send({msg:"need to check email id"})
    }

   /*  Reference.find({emailId:refBody.emailId}, (err, user) => {
        if(err) {
            res.status(500).send({msg:"Something is worng"})
        } else {
                let reference =new Reference(refBody)
        reference.refId=shortId.generate()
        reference.save((err, ref)=>{
            if(err){
                res.status(500).send({msg:"Input not valid"})
            } else { }
        })
        }
    }) */

})


router.post('/referalCodeCheck',verifyRequest,async (req,res) => {
    try{
        let prevTotalDays=0
        let currDuration=req.body.currDuration
        let allCourseOrders=await PaymentDetails.find({paymentFrom:req.userName,paymentReason:"Course purchase"}).exec()
        for(let course of allCourseOrders){
            prevTotalDays=prevTotalDays+(course.totalDays*course.subjectList.length)
        }
        console.log(prevTotalDays,currDuration)
        if(prevTotalDays+currDuration>=120){
            
            let currUser=await User.findOne({userName: req.userName}).exec()
            let newUser=await User.findOneAndUpdate({ownReferCode:currUser.othersReferCode},
                {$inc:{walletPoint:2000}},{useFindAndModify:false})
            console.log(newUser)
            if(newUser){
                currUser.othersReferCode="done_"+currUser.othersReferCode
                currUser.facultyGrade=undefined
                currUser.certification=undefined
                currUser.educationalDet=undefined
                currUser.teachingExp=undefined
                currUser.reference=undefined
                currUser.subjects=undefined
                await currUser.save()
            } 
        }
        res.status(200).send({msg:'Referal checked'})
    
    }catch(err){
        console.log(err)
        res.status(500).send({msg:"something is wrong"})
    }
})

module.exports = router