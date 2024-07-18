const mongoose = require('mongoose');
const { Schema } = mongoose;



const sessionSchema = mongoose.Schema({
     user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
    token:String
})


module.exports = mongoose.model('Session',sessionSchema);