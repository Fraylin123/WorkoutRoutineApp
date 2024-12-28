require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port =  5000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
