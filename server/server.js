const express=require('express')
const bodyParse= require('body-parser')
const cors= require('cors')
const payment= require('./routes/payment')
const verification= require('./routes/onetime-verifcation')
const auth= require('./routes/auth')
const subjectDet= require('./routes/subject-det')
require('dotenv').config()

const PORT= process.env.SERVER_PORT

const app = express()

app.use(bodyParse.json())
app.use(cors())

app.use('/payment',payment)
app.use('/verification',verification)
app.use('/auth',auth)
app.use('/subjectDet',subjectDet)


app.get('/', (req,res) => {
    res.status(200).send("Hello from server")
})

app.listen(PORT, () => {
    console.log("server is running on port ",PORT)
})