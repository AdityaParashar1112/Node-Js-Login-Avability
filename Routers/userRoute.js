const express = require('express');
const { getUsers, updateUser,updatePass,resetPassword,deleteUser} = require('../Controllers/authController');
const authTest = require('../Middlewares/authMiddleware');

const userRoute = express.Router();

userRoute.get('/getusers',authTest,getUsers)
userRoute.put('/updateusers',authTest,updateUser)
userRoute.put('/updatepassword',authTest,updatePass)
userRoute.put('/resetpassword',resetPassword)
userRoute.delete('/deleteuser/:id',authTest,deleteUser)

module.exports = userRoute;





