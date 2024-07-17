const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');


const authTest = async(req,res,next)=>{
   
     try {
        
          const token = req.headers.authorization;

          
            jwt.verify(token,process.env.SECRET,async (err,decode)=>{
               
               if(err){
                  res.send({
                    sucess:'false',
                    message:'Unathorized Error ',
                    Staus:500,
                    Error:err
                  })
               }
               else{
              req.body.id = decode.id;
              const id = req.body.id;
              const user = await userModel.findOne({_id:id});
              if(!user){
               
               return res.send({
                  sucess:'false',
                  message:'Unathorized Error ',
                  Staus:500,
                  Error:err
                })
              }
   
              if(user.name != 'admin'){
         
              return  res.send({
                  sucess:'false',
                  message:'Dont have right to delete the user ',
                  Staus:500
                  
                })
                 
              }
            
              next();
            
            }
                
         })
      
        
     } catch (error) {
        res.send({
            sucess:'false',
            message:'errro in auth part',
            Error:error
        })
     }
}



module.exports = authTest ;