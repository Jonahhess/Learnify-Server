const Question = require('../models/questions');

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { coursewareId, text, correctAnswer, incorrectAnswers } = req.body;
        const newQuestion = new Question({ coursewareId, text, correctAnswer, incorrectAnswers, createdBy: req.user.id });
        await newQuestion.save();
        res.status(201).json({ message: "Question created successfully", question: newQuestion });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all questions for a courseware
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ coursewareId: req.params.coursewareId });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
