const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

//MySQL Connection

const accountsDbPool = mysql.createPool({
    host: process.env.cHost,
    user: process.env.cUser,
    password: process.env.cPassword,
    database: process.env.cDatabase,
    port: process.env.cPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

accountsDbPool.getConnection((error, connection) => {
    if (error) {
        console.error('Connection error:', error);
    } else {
        console.log('Succesful SQL connection');
        connection.release()
    }
});

//MongoDB Atlas connection
mongoose
    .connect(process.env.MongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = { accountsDbPool, mongoose };
