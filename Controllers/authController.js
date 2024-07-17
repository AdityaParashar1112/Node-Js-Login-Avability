const userModel = require("../Models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userRegister = async(req,res)=>{
   
   try{
       
      const {name,email,password,phone,answer} = await req.body;

    if(!name || !email || !password || !phone || !answer){
      return res.send({
         success:'false',
         status:500,
         message:'field are required'
       })
    }

    const existUser = await userModel.findOne({email});
    if(existUser){
      return  res.send({
         success:'false',
         status:500,
         message:'User Already Exist'
       })
    }
    
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
     
    const user = await userModel.create({name,email,password:hashPassword,phone,answer})
   
    return  res.send({
      success:'true',
      status:200,
      message:'User created succesfully',
      User:user
    })


   }catch(err){
      return  res.send({
         success:'false',
         status:500,
         message:'error in register api',
         Error:err
       })
   }

}



const userLogin = async(req,res)=>{
 
   try{
      
      const {email, password} = await req.body;

      if(!email || !password){
        return res.send({
           success:'false',
           status:500,
           message:'Email and Pass... required '
           
         })
         
      }
       
      const existUser = await userModel.findOne({email});
      
      if(existUser){
         
         const confirmPassword = await bcrypt.compare(password,existUser.password);
         // Token Create

         const token = await jwt.sign({id:existUser._id},process.env.SECRET,{expiresIn:'7d'});
         if(confirmPassword){
            return  res.send({
               success:'true',
               status:200,
               message:'Login Succes',
               Login_User:existUser,
               Token:token
             })
         }else{
            return  res.send({
               success:'false',
               status:201,
               message:'Password Incorrect',
               
             })
         }
      }
  

      if(!existUser){
         return res.send({
            success:'false',
            status:500,
            message:'Inavalid Credentials'
            
          })
      }

      
      
   }catch(err){
      return  res.send({
         success:'false',
         status:500,
         message:'Error in login api  ',
         Error:err
       })
   }
  
    
}



const getUsers = async(req,res)=>{

    try {
       
       const id = req.body.id;
       const user = await userModel.findOne({_id:id},{_id:0});
       console.log(user);
       user.password = undefined;
       if(!user){

         return  res.send({
            success:'false',
            status:500,
            message:'User Not Found  ',
            Error:err
          })
       }
         
       return  res.send({
         success:'true',
         status:200,
         user
       })
    
    } catch (err) {
      return  res.send({
         success:'false',
         status:500,
         message:'Error in get api  ',
         Error:err
       })
    }
}


const updateUser = async(req,res)=>{
   try {
      
      const id = req.body.id;
      console.log(id);
      const user = await userModel.findOne({_id:id});
      console.log(user);
      if(!user){
        
         return  res.send({
            success:'false',
            status:500,
            message:'User Not Found  '
            
          })
      }
      else{
          
         const {name , phone} = req.body
         if(name){user.name = name};
         if(phone){user.phone = phone};
         await user.save();
        
            return  res.send({
               success:'true',
               status:200,
               message:'user update succesfully',
               user
             })
        
      }

   } catch (error) {
      return  res.send({
         success:'false',
         status:500,
         message:'Error in update api  ',
         Error:err
       })
   }
}


//Update Password:

const updatePass = async(req,res)=>{
   
    try {
        const id = req.body.id;
        const user = await userModel.findOne({_id:id})
        
        if(!user){
         return  res.send({
            success:'false',
            status:500,
            message:'user not found ',
            Error:err
          })
        }


         const {password} = await req.body;
         var salt = bcrypt.genSaltSync(10);
         var hashPassword = bcrypt.hashSync(password, salt);
         console.log(hashPassword)
         if(hashPassword){
         
            
            user.password = hashPassword;
           
         }
  
         await user.save();
          return  res.send({
            success:'true',
            status:200,
            message:'user password is updated ',
            
          })

    } catch (err) {
      return  res.send({
         success:'false',
         status:500,
         message:'Error in update api  ',
         Error:err
       })
    }
}


const resetPassword = async(req,res)=>{
 
     try {
      
         const {email , answer , opassword , npassword } = req.body ; 
         
         if(!email || !answer || !opassword || !npassword){
            return res.send({
               sucess:'false',
               status:500,
               message:'all fields are required to reset the password'
           });
         }
         
         const user = await userModel.findOne({email,answer})

         if(!user){

            return res.send({
               sucess:'false',
               status:500,
               message:'User Not Found  '
           });
         }

         
         const checkp = await bcrypt.compare(opassword,user.password);
        
         if(!checkp){
            return res.send({
               sucess:'false',
               status:500,
               message:'old password incorrect '
           });
         }
         
         
         if(npassword == opassword){
            return res.send({
               sucess:'false',
               status:500,
               message:'old and new password not same'
           });
         }

         var salt = bcrypt.genSaltSync(10);
         var nhashPassword = bcrypt.hashSync(npassword, salt);

         if(nhashPassword){user.password = nhashPassword};
         await user.save();
         return res.send({
            sucess:'true',
            status:200,
            message:'password update succesfully '
        });

         
         
         

     } catch (err) {
       return res.send({
            sucess:'false',
            status:500,
            message:'error in reset api'
        });
     }
}


const deleteUser = async(req,res)=>{
   
    try {

       const id = req.params.id;
      const deleteUser =  await userModel.findByIdAndDelete({_id:id});
     
         return res.send({
            sucess:'tru',
            status:500,
            message:'user delete '
        });
     
    } catch (error) {
      return res.send({
         sucess:'false',
         status:500,
         message:'error in Delete api'
     });
    }
}


module.exports = {userRegister , userLogin,getUsers,updateUser,updatePass,resetPassword,deleteUser};


