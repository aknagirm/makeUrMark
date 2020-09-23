const mongoose =require('mongoose')

const Schema =mongoose.Schema

const scheduledBacthSchema =new Schema({
    createdDate: Date,
    createdBy: String,
    day: String,
    startTime: String,
    endTime: String,
    grade: String,
    subject: String,
    batchType: String,
    maxStudent: Number,
    userList: [{courseObjId:String, mappedDate: Date, mappedBy: String, userName: String, 
        firstName: String, lastName: String, startDate: Date, endDate: Date}]
})

module.exports =mongoose.model('schedule_batch_map',scheduledBacthSchema,'schedule_batch_map')