const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

//MySQL Connection

let accountsDb;

function handleConnection() {
    accountsDb = mysql.createConnection({
        host: process.env.cHost,
        user: process.env.cUser,
        password: process.env.cPassword,
        database: process.env.cDatabase,
        port: process.env.cPort,
    });

    accountsDb.connect((error) => {
        if (error) {
            console.error('Connection error:', error);
            setTimeout(handleConnection, 2000)
        } else {
            console.log('Succesful SQL connection');
        }
    });
    
    accountsDb.on('error', err => {
        console.log('MySQL error', err)
        if (err.code = 'PROTOCOL_CONNECTION_LOST'){
            handleConnection();
        }
        else{
            throw err;
        }
        
    });

}

handleConnection();

//MongoDB Atlas connection
mongoose
    .connect(process.env.MongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = { accountsDb, mongoose };
