const express=require('express')
const razorpay =require('razorpay')
const shortId= require('shortid')
require('dotenv').config()
const router =express.Router()
const PaymentDetails= require('../models/order-payment-history')
const verifyRequest =require('../routes/verify-token')

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
      let orderDetails =req.body
      orderDetails.orderId=orderDetails.orderId==null?`wallet_${shortId.generate()}`:orderDetails.orderId
      orderDetails.paymentId=orderDetails.paymentId==null?`wallet_${shortId.generate()}`:orderDetails.paymentId
      orderDetails.transDate=new Date()
      orderDetails.paymentFrom=orderDetails.paymentFrom? orderDetails.paymentFrom: user
      let payment =new PaymentDetails(orderDetails)
    console.log("payment")
      await payment.save()
      res.status(200).send({msg: 'Payment captured'})
    }catch(error){
      console.log(error)
      res.status(500).send({msg:'Something is wrong'})
    }
  })
module.exports = router