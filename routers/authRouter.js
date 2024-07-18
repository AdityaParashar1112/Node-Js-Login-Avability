const express = require('express');
const {userCreated , userLogin, userLogout }= require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddelware');

const authRoute = express.Router();

// Register Route 
authRoute.post('/register', userCreated);
authRoute.post('/login', userLogin);
authRoute.post('/login', userLogin);
authRoute.delete('/logout',authMiddleware,userLogout)

module.exports = authRoute;