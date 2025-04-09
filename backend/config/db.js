const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

//MySQL Connection
const accountsDb = mysql.createConnection({
    host: process.env.cHost,
    user: process.env.cUser,
    password: process.env.cPassword,
    database: process.env.cDatabase,
});

accountsDb.connect((error) => {
    if (error) {
        console.error('Connection error:', error);
    } else {
        console.log('Succesful SQL connection');
    }
});

//MongoDB Atlas connection
mongoose
    .connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = { accountsDb, mongoose };
