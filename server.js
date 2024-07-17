const express  = require('express');
const dotenv = require('dotenv');
const authRoute = require('./Routers/authRoute');
const conn = require('./Config/dbConnection');
const morgan = require('morgan');
const userRoute = require('./Routers/userRoute');
const userRestro = require('./Routers/restroRoute')


const app = express();
dotenv.config();


conn();


//Middelwares
app.use(morgan('dev'));
app.use(express.json());




app.use('/api/v1',authRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1/',userRestro);


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`);
})