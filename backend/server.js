//Env variable
require('dotenv').config();

//Dependecies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { accountsDb, mongoose } = require('./config/db'); //Automatically start the MySQL and MongoDB Atlas by importing them

const app = express();
const port = process.env.Port;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/exercises', require('./routes/exercises.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
