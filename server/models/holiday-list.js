const mongoose=require('mongoose')

const Schema =mongoose.Schema

const HolidaySchema=new Schema({
    holidayDate: Date,
    event: String
})

module.exports=mongoose.model('holiday_list',HolidaySchema,'holiday_list')