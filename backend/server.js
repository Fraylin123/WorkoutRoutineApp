//Env variable
require('dotenv').config();

//Dependecies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { accountsDbPool, mongoose } = require('./config/db'); //Automatically start the MySQL and MongoDB Atlas by importing them

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'https://workoutroutineapp.fraylinayala.com', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/exercises', require('./routes/exercises.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

//Serve frontend through the backend
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });

app.listen(port, () => console.log(`Server running on port ${port}`));