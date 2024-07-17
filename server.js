const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const router = require('./routers/userRouter');
const conn = require('.//config/dbconnection.js')
const authRoute = require('.//routers/authRouter.js')
const userRestro = require('.//routers/restroRouter.js');
const emailRouter = require('./routers/emailRouter.js');


const app = express();
dotenv.config();


conn();

//Middlewares

app.use(morgan("dev"))
app.use(express.json());





//get all api calls

// app.use('/api/v1',router)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1',userRestro)
app.use('/api/v1',emailRouter);
//Server Listen and Port

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.listen(PORT,()=>{
    console.log('server started');
})



