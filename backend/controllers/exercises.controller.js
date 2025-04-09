const Exercise = require('../models/exercise.model');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching exercises' });
    }
};

const getExercise = async (req, res) => {
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
};

module.exports = { getAllExercises, getExercise };
