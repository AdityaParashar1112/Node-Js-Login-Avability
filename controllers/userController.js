const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const sessionModel = require("../models/sessionModel");
const dotenv = require('dotenv');

const userCreated = async (req, res) => {
    try {
        
        const { Username, Email, Password, Phone, Address } = req.body;
        
        if (!Username ||!Email ||!Password ||!Phone ||!Address) {
            return res.send({
                success: 'false',
                status: '201',
                error: 'fields are required'
            });
        }

        // existing users 
        const userExist = await userModel.findOne({ Email });
        if (userExist) {
            return res.send({
                success: 'false',
                status: '201',
                error: 'Email Already Used'
            });
        }
 
   
     //Password Hasing 

     var salt = bcrypt.genSaltSync(10);
     const hashPassword = await bcrypt.hashSync(Password, salt);

       
        const user = await userModel.create({ Username, Email, Password:hashPassword, Phone, Address });

       const auth = await nodeMailer.createTransport({
          service:"gmail",
          secure:true,
          port:465,
          auth:{
            user:"ap@taketwotechnologies.com",
            pass:"qnptgosmkkhrwwuw"
          }

       })


       const receiver = {
          from:"ap@taketwotechnologies.com",
          to:user.Email,
          subject:`Registeration Onboarding Completed - ${user.Username}`,
          text:`Hey ${user.Username} Congratulation to join our Team `
       }

   
        auth.sendMail(receiver , (err,emailResponse) =>{
           
             if(err){
                return res.send({
                    Success: 'true',
                    error: 'Error in Mailer ',
                    err
                })
             }
             else {
                return res.send({
                    success: 'true',
                    message: 'User Created Successfully and mail sent ',

             })
             
        }

        });

 
    }catch (err) {
        return res.send({
            success: 'false',
            status: '500',
            error: `error related to Register api`
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email ||!Password) {
            return res.send({
                success: 'false',
                status: '201',
                message: 'Email and Password Require'
            });
        }

        const user = await userModel.findOne({ Email });
  
         


        if (!user) {
            return res.send({
                success: 'false',
                status: '201',
                message: 'User Not Found'
            });
        }

        //check thepassword

        const isMatch = await bcrypt.compare(Password , user.Password) 
         if(!isMatch){
            return res.send({
               success: 'false',
               message: 'Invalid Credentials',
               
           });
         }
     
          
         const token = await jwt.sign({id:user._id},process.env.SECRET_TOKEN ,{
            expiresIn: '7d'
           })

           const  activeCounts   = await sessionModel.countDocuments({user:user._id});
           console.log(activeCounts);
           
         
            if(activeCounts>2){
                return res.send({
                    success: 'true',
                    message: 'You Are alreasy login in 3 Screens logout from one of them ',
                    
                });
            }
            await sessionModel.create({user:user._id,token:token})

        // Add your login logic here
        // For now, just return a success message
        return res.send({
            success: 'true',
            message: 'Login Successful',
            token,
            user
        });
    } catch (err) {
        res.send({
            success: 'false',
            status: 500,
            message: 'error in Login api'
        });
    }
};

const userLogout = async(req,res)=>{
      const userid = req.body.UserId;
      console.log(userid);
      const activeSession = await sessionModel.countDocuments({user:userid});
     
      for(var i=0;i<activeSession;i++){
        await sessionModel.deleteOne({user:userid})
      }
     
      
      res.send({
        staus:200,
        message:'Delete Succesfully'
      })
}






module.exports = { userLogin, userCreated , userLogout};