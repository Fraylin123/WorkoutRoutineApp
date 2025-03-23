//Env variables
require('dotenv').config()

//Dependecies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.Port;

//Middleware
app.use(cors());
app.use(express.json());

//SQL Connection
const accountsDb = mysql.createConnection({
    host: process.env.cHost,
    user: process.env.cUser,
    password: process.env.cPassword,
    database: process.env.cDatabase
});

accountsDb.connect((error) => {
    if (error) {
        console.error("Connection error:", error)
    }
    else {
        console.log("Succesful SQL connection")
    }
})

//MongoDB connection
mongoose.connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const exerciseSchema = new mongoose.Schema({
    _id: String,
    equipment: String,
    level: String,
    primaryMuscle: String,
    secondaryMuscles: String,
    type: String,
    video: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

//APIs Routes
app.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ err: 'Error fetching exercises' });
    }
});

app.get('/exercises/:name', async (req, res) => {
    try {
        const exercise = await Exercise.findOne({ _id: req.params.name });
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).send('Exercise not found');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching exercise' });
    }
});

//CRUD routes

//Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    accountsDb.query("SELECT * FROM users where username = ?", [username], async (error, result) => {
        if (error) return res.status(500).json({ error: "Database server error" })

        if (result.length == 0) return res.status(404).json({ error: "User not found" });

        const user = result[0]
        
        const match = await bcrypt.compare(password, user.hashed_pw);

        if (!match){
            return res.status(401).json({message: "Invalid credentials"})
        }


        const token = jwt.sign({userId: user.id, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn: "5h"})
        res.json({message: "User authenticated"})
    })

})

//Registration route
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    //Query to handle cases where there is already an account with the same email
    accountsDb.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
        if (error) return res.status(500).json({ error: "Database server error" })

        if (result.length > 0) {
            return res.status(400).json({ message: "Account already exists with that email" })
        }

        const hashedPw = await bcrypt.hash(password, 10) //Hash plaintext password with a cost factor of 10, 2^10 = 1024 iterations

        accountsDb.query(`
        INSERT INTO users (username, email, hashed_pw) 
        VALUES (?, ?, ?);`, [username, email, hashedPw], (error, result) => {
            if (error) return res.status(500).json({ error: "Registration error" })
            res.status(201).json({ message: "User created" })
        });
    });
});




app.listen(port, () => console.log(`Server running on http://localhost:${port}`));