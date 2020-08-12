const express=require('express')
const bodyParse= require('body-parser')
const cors= require('cors')
const payment= require('./routes/payment')
const verification= require('./routes/onetime-verifcation')
const auth= require('./routes/auth')
const reference= require('./routes/faculty-student-references')
const subjectDet= require('./routes/subject-det')
const facultyExplore= require('./routes/faculty-explore-options')
const mongoose= require('mongoose')
require('dotenv').config()

const PORT= process.env.SERVER_PORT

const app = express()

app.use(bodyParse.json())
app.use(cors())

const userDb = process.env.MONGOOSE_CONNECTION

mongoose.connect(userDb, { useNewUrlParser: true, useUnifiedTopology: true }, err=> {
    if(err){
        console.error('Erros!'+ err)
    }
}
)

app.use('/payment',payment)
app.use('/verification',verification)
app.use('/auth',auth)
app.use('/subjectDet',subjectDet)
app.use('/refer',reference)
app.use('/facultyExplore',facultyExplore)

app.get('/', (req,res) => {
    res.status(200).send("Hello from server")
})

app.listen(PORT, () => {
    console.log("server is running on port ",PORT)
})

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })