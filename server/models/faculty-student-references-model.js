const mongoose =require('mongoose')

const schema =mongoose.Schema

const references =new schema({
    userRole: String,
    userName: String,
    referedRole: String,
    firstName: String,
    lastName: String,
    contactNumber: String,
    currentlyStudying: String,
    subjectsForFaculty: String 

})

module.exports = mongoose.model('all_faculty_student_references', references, 'all_faculty_student_references')