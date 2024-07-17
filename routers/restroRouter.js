const express = require('express');

const userRestro  = express.Router();
 

userRestro.post('/creatrestro',(req,res)=>{
   try {
     console.log('restro created') ;
     res.send({
        sucess:'true',
        message:'Restaurent is created ',
        staus:200
       });
     
   } catch (err) {
       res.send({
        sucess:'false',
        status:500,
        message:'error in restro api',
        Error : err
       });
   }
});




module.exports = userRestro ; 