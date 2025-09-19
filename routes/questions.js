const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionsController');

// Create a new question
router.post('/', auth, createQuestion);

// Get all questions for a courseware
router.get('/courseware/:coursewareId', getAllQuestions);

// Get a question by ID
router.get('/:id', getQuestionById);

// Update a question by ID
router.put('/:id', auth, updateQuestion);

// Delete a question by ID
router.delete('/:id', auth, deleteQuestion);

module.exports = router;
