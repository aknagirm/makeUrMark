const mongoose =require('mongoose')

const schema =mongoose.Schema


const userSchema =new schema({
        creationDate: Date,
        updateDate: Date,
        userRole: String,
        firstName: String,
        middleName: String,
        lastName: String,
        password: String,
        gender: String,
        grade: String,
        email: String,
        contactNumber: String,
        userName: String,
        fathersFirstName: String,
        fathersMiddleName: String,
        fathersLastName: String,
        fathersEmail: String,
        fathersContactNumber: String,
        mothersFirstName: String,
        mothersMiddleName: String,
        mothersLastName: String,
        mothersEmail: String,
        mothersContactNumber: String,
        courses: [{admissionDate:Date,board:String,grade:String,subject:String,duration:Number,
                batchType:String,status:String}],

        subjects: Array,
        language: Array,
        facultyGrade: Array,
        
        educationalDet: [
                {standard: String, passingInstitute: String, passingYear: String,
                 passingMarks: String, course: String, studiedSub: String}],

        teachingExp: [{till: String, from: String, institute: String}],
        certification: Array,
        reference: [{refName: String, refNumber: String}],
        homeSystem: Array,
        smartPhone: String,
        makeAndModel: String,
        broadBand: Array,
        bandWidth: String,
        whiteBoardMarker: String,
        selectedCVFile: String,
        selectedImageFile: String,
        status: String,
        activeFlag: Boolean,
        ownReferCode: String,
        othersReferCode: String,
        bonusCourseDays: Number
})

module.exports = mongoose.model('all_user_role', userSchema, 'all_user_role')