const mongoose=require('mongoose')

const Schema=mongoose.Schema

const orderPaymentHistory = new Schema({
    transDate: Date,
    capturedBy: String,
    orderId: String,
    paymentId: String,
    subjectList: [{grade: String, subject: String, batchType: String, tutionFees: String}],
    totalDays: Number,
    testList: [{testId: String, grade: String, subject: String, testDateTime: Date, duration: String, userName: String}],
    paymentReason: String,
    paymentFrom: String,
    paymentTo: String,
    paymentIndicator: String,
    amount: Number,
    remarks: String,
    delFlag: Boolean,
    delBy: String,
    delDate: Date,
})

module.exports = mongoose.model('order_payment_history', orderPaymentHistory, 'order_payment_history')