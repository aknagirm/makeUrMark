const mongoose =require('mongoose')

const schema =mongoose.Schema

const userSchema =new schema({
         secretKey: String,
         role: String,
         firstName: String,
         lastName: String,
         password: String,
         grade: String,
         subjects: String,
         email: String,
         contactNumber: String,
         address1: String,
         address2: String,
         address3: String,
         schoolName: String,
         schoolCity: String,
         schoolboard: String
})

module.exports = mongoose.model('all_user_role', userSchema, 'all_user_role')