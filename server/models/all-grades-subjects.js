const mongoose =require('mongoose')

const Schema =mongoose.Schema

/* const structureSchema =new Schema({
    name: String,
    grades : [{
        createDate: Date,
        createdBy: String,
        label: String,
        value: String,
        subjects: [{
            createDate: Date,
            createdBy: String,
            label: String,
            value: String,
            testFees: {
                createDate: Date, 
                createdBy: String, 
                fees: String},
            batches: [{
                createDate: Date,
                createdBy: String,
                studentCount: String,
                fees: String,
                status: String
            }]
        }]
    }]
})
 */

const structureSchema =new Schema({
    docType: String,
    createdDate: Date,
    createdBy: String,
    label: String,
    value: String,
    grade: String,
    subject: String,
    batchType: String,
    testFees: String,
    tutionFees: String,
    countForDiscount: String,
    discount: String
})
module.exports =mongoose.model('struct_misc_others_details',structureSchema,'struct_misc_others_details')