const mongoose =require('mongoose')

const schema =mongoose.Schema

const subjectDetSchema =new schema({
    subjectName: String,
    type: String,
    grade: String,
    facultyName: String,
    startTime: String,
    endTime: String,
    day: String,
    board: String,
    cost: String,
    subjectId: String,
    batchId: String,
    
})

module.exports = mongoose.model('subject_details', subjectDetSchema, 'subject_details')