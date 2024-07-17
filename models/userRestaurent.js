const mongoose = require('mongoose');


const userRestro = new mongoose.Schema({

   title:{
      type:String
   },

   image:{
    type:String
   },

   Food:{
     type:Array
   },

   time:{
    type:String
   },

   pickup:{
    type:Boolean,
    default:true
   },

   Deleivery:{
    type:Boolean,
    default:true
   },

   isopen:{
    type:Boolean,
    default:true
   },

   logo:{
    type:String
    
   },

   rating:{
    type:Number,
    
   },

   ratingcount:{
    type:Number
   },

   code:{
    type:String
   }
   


})