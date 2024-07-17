const express = require('express');
const {userCreated , userLogin }= require('../controllers/userController')

const authRoute = express.Router();

// Register Route 
authRoute.post('/register', userCreated);
authRoute.post('/login', userLogin);
authRoute.get('/',(req,res)=>{
    res.send('Worked');
})

module.exports = authRoute;