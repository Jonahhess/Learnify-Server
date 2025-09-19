const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createReviewCard,
    getAllReviewCards,
    getReviewCardById,
    updateReviewCard,
    deleteReviewCard
} = require('../controllers/reviewCardController');

// Create a new review card
router.post('/', auth, createReviewCard);

// Get all review cards for a user
router.get('/', auth, getAllReviewCards);

// Get a review card by ID
router.get('/:id', auth, getReviewCardById);

// Update a review card by ID
router.put('/:id', auth, updateReviewCard);

// Delete a review card by ID
router.delete('/:id', auth, deleteReviewCard);

module.exports = router;
