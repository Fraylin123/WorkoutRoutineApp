const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    _id: String,
    equipment: String,
    level: String,
    primaryMuscle: String,
    secondaryMuscles: String,
    type: String,
    video: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
