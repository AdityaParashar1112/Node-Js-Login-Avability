const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   
    Username:{
        type:String,
        require:[true,'username is required']
         
    },

    Email:{
        type:String,
        require:[true,'email is required'],
        unique:true
    },

    Password:{
        type:String,
        
    },

    Address:{
        type:Array
    },

    UserType:{
        type:String,
        default:'Client',
        enum:['Admin','Client','Vendor']
    },

    Profile:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fprofile%2520icon&psig=AOvVaw3tYzfISSU_to8Dy9WfUYAe&ust=1720595485038000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDZlOizmYcDFQAAAAAdAAAAABAE'
    }


},{timestamps:true})

module.exports = mongoose.model("User",userSchema)