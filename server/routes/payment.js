const express=require('express')
const razorpay =require('razorpay')
const shortId= require('shortid')
require('dotenv').config()
const router =express.Router()
const PaymentDetails= require('../models/order-payment-history')
const User= require('../models/user')
const verifyRequest =require('../routes/verify-token')

shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const razorpayInstance=new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })

  router.post('/verification', (req, res)=>{

    const secret= 'secret'

    const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}

    res.status(200).json({status: 'ok'})
  })

  router.post('/pay', async (req,res)=>{
    const currency='INR'
    const payment_capture=1
    const notes=null
  
    const options={
      amount: req.body.amount.toString(), 
      currency, 
      receipt: shortId.generate(),
      payment_capture, notes}
  
      try {
        const response = await razorpayInstance.orders.create(options)
        res.json({
          id: response.id,
          currency: response.currency,
          amount: response.amount
        })
      } catch (error) {
        console.log(error)
        res.status(500).send({msg:'Something is wrong'})
      }
  })

  router.post('/orderPaymentAdd',verifyRequest, async (req,res)=>{
    try{
      let user=req.userName
      let details =req.body
      /* console.log(details, details.paymentList[0].transDate, "Hi")
let someVar=details.paymentList[0].transDate?orderDetails.transDate: new Date()
connsole.log(someVar) */
      for(let orderDetails of details.paymentList) {
        orderDetails.orderId=orderDetails.orderId==null?`wallet_${shortId.generate()}`:orderDetails.orderId
        orderDetails.paymentId=orderDetails.paymentId==null?`wallet_${shortId.generate()}`:orderDetails.paymentId
        orderDetails.transDate=orderDetails.transDate? orderDetails.transDate: new Date()
        orderDetails.paymentFrom=orderDetails.paymentFrom? orderDetails.paymentFrom: user
        orderDetails.capturedBy=orderDetails.paymentFrom? user: 'system'
        orderDetails.delBy=''
        orderDetails.delFlag=false
        orderDetails.delDate= undefined
        let payment =new PaymentDetails(orderDetails)
        await payment.save()
      }
      res.status(200).send({msg: 'Payment captured'})
    }catch(error){
      console.log(error)
      res.status(500).send({msg:'Something is wrong'})
    }
  })

  router.post('/specificUsersOrder',verifyRequest,async (req,res)=>{
    try{
      let userName=req.body.userName?req.body.userName: req.userName
      let details=req.body
      console.log(details)
      let orderList
      if(details.startDate && details.endDate){
          orderList= await PaymentDetails.find({paymentFrom: userName, 
          transDate: {$gte:details.startDate, $lte:details.endDate}}).exec()
      } else {
          orderList= await PaymentDetails.find({paymentFrom: userName}).exec()
      }
      res.status(200).send({orderList})
    } catch(err){
      console.log(err)
      res.status(500).send({msg:'Something is wrong'})
    }
  })

  router.post('/allPayments',verifyRequest,async (req,res)=>{
    try{
      let details=req.body
      console.log(details)
      let orderList
      orderList= await PaymentDetails.find({transDate: 
        {$gte:details.startDate, $lte:details.endDate}}).sort([['transDate', 1]]).exec()
      res.status(200).send({orderList})
    } catch(err){
      console.log(err)
      res.status(500).send({msg:'Something is wrong'})
    }
  })

  router.get('/associatesFeesCapture', async (req,res)=>{
    try {
      currDate=new Date()
      sDate=new Date(currDate.setMonth(currDate.getMonth()-2))
      eDate=new Date()
      let facultyList=await User.find({userRole:'faculty',status:'working'}).exec()
      let paymentList=await PaymentDetails.find({transDate: 
        {$gte:sDate, $lte:eDate}, paymentIndicator:'D'}).sort({transDate:'desc'}).exec()
      list=[]
      for(let faculty of facultyList){
        previousPayments=[]
        previousPayments=paymentList.filter(payment=>payment.paymentTo==faculty.userName)
        let obj={'previousPayments':previousPayments,'userObj':faculty}
        list.push(obj)
      }
     // let obj=[...facultyList]
      res.status(200).send({list})

    }catch(err){
      console.log(err)
      res.status(500).send({msg:"Something is wrong"})
    }
  })

  router.post('/deleteTrans', verifyRequest, async (req,res)=>{
    try{
      txnObjId=req.body._id
      user=req.userName
      console.log(txnObjId)
      let txnObj=await PaymentDetails.findById(txnObjId).exec()
      txnObj.delFlag=true
      txnObj.delBy=user
      txnObj.delDate=new Date()
      await txnObj.save()
      res.status(200).send({msg:"Record deleted"})
    } catch(err){
      console.log(err)
      res.status(500).send({msg:"Something is wrong"})
    }
  })

module.exports = router