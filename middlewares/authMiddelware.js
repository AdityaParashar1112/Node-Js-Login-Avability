const jwt = require('jsonwebtoken');


const authMiddleware = async(req,res,next)=>{
 
     try {

        const token = req.headers.authorization;
        console.log(token);

        if(!token){
            res.send({
                staus:500,
                message:"Token Not There",
                error:error
            });
        }
        
        await jwt.verify(token, process.env.SECRET_TOKEN,(err,decode)=>{
           
             if(err){
                res.send({
                    staus:500,
                    message:"Erro in Token not valided",
                    error:err
                });
             }

             req.body.UserId = decode.id;
             //console.log(userid)
             next();
        })

         
        
     }catch (error) {
        res.send({
            staus:500,
            message:"Erro in auth oart",
            error:error
        });
     }
}


module.exports  = authMiddleware