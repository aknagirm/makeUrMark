const express=require('express')
const razorpay =require('razorpay')
const shortId= require('shortid')
require('dotenv').config()
const router =express.Router()

const razorpayInstance=new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })

  router.post('/verification', (req, res)=>{

    const secret= 'secret'
    console.log(req.body)

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
  
  router.post('/pay',async (req,res)=>{
    console.log(req.body.amount.toString())
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
        console.log(response)
        res.json({
          id: response.id,
          currency: response.currency,
          amount: response.amount
        })
      } catch (error) {
        console.log(error)
      }
  })

module.exports = router