const mongoose=require('mongoose')

const Schema=mongoose.Schema

const materialUpload = new Schema({
    userName: String,
    userRole: String,
    docType: String,
    grade: String,
    subject: String,
    chapters: String,
    materialType: String,
    selectedMaterial: String
})

module.exports = mongoose.model('all_ques_material', materialUpload, 'all_ques_material')