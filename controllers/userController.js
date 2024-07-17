const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');


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

module.exports = { userLogin, userCreated };