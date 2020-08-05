const mongoose =require('mongoose')

const schema =mongoose.Schema

const userSchema =new schema({
         secretKey: String,
         role: String,
         firstName: String,
         lastName: String,
         password: String,
         grade: String,
         email: String,
         contactNumber: String,
         address1: String,
         address2: String,
         address3: String,
         schoolName: String,
         schoolCity: String,
         schoolboard: String,

         
        subjects: Array,
        language: Array,
        facultyGrade: Array,
        middleName: String,
        
        educationalDet: [
                {standard: String, passingInstitute: String, 
                passingYear: String, passingMarks: String, passingRemarks: String}],

        teachingExp: [{till: String, from: String, institute: String}],
        certification: Array,
        reference: [{refName: String, refNumber: String}],
        homeSystem: Array,
        smartPhone: String,
        makeAndModel: String,
        broadBand: String,
        bandWidth: String,
        whiteBoardMarker: String,
        selectedCVFile: String
})

module.exports = mongoose.model('all_user_role', userSchema, 'all_user_role')