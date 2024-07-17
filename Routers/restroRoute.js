const express = require('express');
const authTest = require('../Middlewares/authMiddleware')
const {restroController , getFood, getSingleFood} = require('../Controllers/restroController')
const userRestro  = express.Router();
 

userRestro.post('/creatrestro',authTest,restroController);
userRestro.get('/getfoods',getFood)
userRestro.get('/getsinglefood/:id',getSingleFood)


module.exports = userRestro ; 