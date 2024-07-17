const mongoose = require('mongoose');


const conn = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database Connected ')
    }catch(error) {
         res.send({
            sucess:'false',
            status:'500',
            Message:'database not connected '
         })

    }
}

module.exports = conn;