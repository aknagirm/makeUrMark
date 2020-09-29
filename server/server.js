const express=require('express')
const bodyParse= require('body-parser')
const cors= require('cors')
const payment= require('./routes/payment')
const verification= require('./routes/onetime-verifcation')
const auth= require('./routes/auth')
const reference= require('./routes/faculty-student-references')
const subjectDet= require('./routes/subject-det')
const facultyExplore= require('./routes/faculty-explore-options')
const homeOptions= require('./routes/home-options')
const adminExplore= require('./routes/admin-options')
const studentExplore= require('./routes/student-explore-options')
const scheduledFunct= require('./scheduler/all-scheduler')
const mongoose= require('mongoose')
const cron = require('node-cron');
require('dotenv').config()

const PORT= process.env.SERVER_PORT

const app = express()

app.use(bodyParse.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const userDb = process.env.MONGOOSE_CONNECTION

mongoose.connect(userDb, { useNewUrlParser: true, useUnifiedTopology: true }, err=> {
    if(err){
        console.error('Erros!'+ err)
    } else {
        console.log('connected to makeurmark db')
    }
}
)


cron.schedule("0 0 0 * * *",() => {
    console.log("Course Validity checked");
    scheduledFunct.userCourseValidityCheck()
})

app.use('/subjectDet',subjectDet)
app.use('/payment',payment)
app.use('/verification',verification)
app.use('/auth',auth)
app.use('/homeOptions',homeOptions)
app.use('/refer',reference)
app.use('/facultyExplore',facultyExplore)
app.use('/adminExplore',adminExplore)
app.use('/studentExplore',studentExplore)

/* app.use(function(err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    res.status(err.status || 500);
    res.end();
}); */

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

  process.on('uncaughtException', function (err) {
    console.log(err.stack);
  });