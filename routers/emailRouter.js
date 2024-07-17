const express = require('express');
const emailController = require('../controllers/emailController');

const emailRouter = express.Router();

emailRouter.get('/send-email',emailController)




module.exports = emailRouter;