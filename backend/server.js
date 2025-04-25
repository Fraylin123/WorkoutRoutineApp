//Env variable
require('dotenv').config();

//Dependecies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { accountsDb, mongoose } = require('./config/db'); //Automatically start the MySQL and MongoDB Atlas by importing them

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://workout-routine-app-frontend.s3-website-us-east-1.amazonaws.com', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/exercises', require('./routes/exercises.routes'));
app.use('/api/auth', require('./routes/auth.routes'));


app.listen(port, () => console.log(`Server running on port ${port}`));