const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const { getAllExercises, getExercise } = require('../controllers/exercises.controller');

router.get('/', verifyToken, getAllExercises);
router.get('/:name', verifyToken, getExercise);

module.exports = router;
