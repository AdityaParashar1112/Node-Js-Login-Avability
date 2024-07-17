const restroModel = require('../Models/restroModel')
const userRestro  = require('../Models/restroModel');


const restroController = async(req,res)=>{
    try {
        

       const {title, code, food} = req.body;

       if(!title || !code){

       return  res.send({
           sucess:'false',
           message:'Please fill the title , food and code ',
           staus:500
          });}
        
       await userRestro.create({title,code,food});
       return res.send({
        sucess:'true',
        message:'restro created',
        staus:200
       });

      } catch (err) {
        return  res.send({
           sucess:'false',
           status:500,
           message:'error in restro api',
           Error : err
          });
      }
     
}


const getFood = async(req,res)=>{
   try {
    
       const food  = await restroModel.find({});
    if(!food){

        return  res.send({
            sucess:'true',
            status:500,
            message:'No Food is Presrebr',
            Food_Items: food.length
           });

    }
      
    return  res.send({
        sucess:'true',
        status:200,
        food,
        Food_Items: food.length
       });

        
   } catch (err) {
    return  res.send({
        sucess:'false',
        status:500,
        message:'error in restro api',
        Error : err
       });
   }
}



const getSingleFood = async(req,res)=>{
   try {
    
     const id = req.params.id;
     console.log(id);
     const food = await userRestro.findOne({id});

     if(!food){
        return  res.send({
            sucess:'false',
            status:500,
            message:'NO Food is availalab;e right nowe',
            Error : err
           });
     }
     
     return  res.send({
        sucess:'true',
        status:200,
        message:'Here is yoour food',
        food
       });
    

   } catch (err) {
    return  res.send({
        sucess:'false',
        status:500,
        message:'error in get single food api',
        Error : err
       });
   }
}


module.exports = { restroController,getFood,getSingleFood };