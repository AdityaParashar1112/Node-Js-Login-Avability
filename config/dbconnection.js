const mongoose = require('mongoose');

const conn  = async()=>{
       try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log('Database Connected ');
       } catch (error) {
           console.log(`databse not connected because of this ${error}`)
       }

    }

    module.exports = conn;