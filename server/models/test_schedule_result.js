const mongoose =require('mongoose')

const schema =mongoose.Schema

const subjectDetSchema =new schema({    
    userName: String,
    userRole: String,
    testId: String,
    grade: String,
    subject: String,
    syllabus: String,
    testDateTime: Date,
    duration: String,
    fullMarks: String,
    result: [
        {userName: String, firstName: String, lastName:String, marks: String}
    ]
})

module.exports = mongoose.model('test_schedule_result', subjectDetSchema, 'test_schedule_result')