const express = require('express');
const {userRegister , userLogin } = require('../Controllers/authController');


const authRoute = express.Router();


authRoute.post('/register',userRegister);
authRoute.post('/login',userLogin);

module.exports = authRoute ; 