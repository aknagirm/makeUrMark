const mongoose =require('mongoose')

const Schema =mongoose.Schema

const structureSchema =new Schema({
    name: String,
    grades : [
        {lable: String,
         value: String,
         subjects: [
             {lable: String,
              value: String}
         ]
        }
    ]
})

module.exports =mongoose.model('struct_misc_others_details',structureSchema,'struct_misc_others_details')