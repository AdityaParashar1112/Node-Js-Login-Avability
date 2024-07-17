const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({

     name:{
        type:String,
     },
     email:{
        type:String,
     },
     password:{
        type:String,
     },
     phone:{
        type:String,
     },

     answer:{
      type:String,
   }

},{timestamps:true})

module.exports = mongooose.model('User',userSchema);