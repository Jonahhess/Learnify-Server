const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const courseRoutes = require('./courses');
const coursewareRoutes = require('./coursewares');
const reviewCardRoutes = require('./reviewCards');
const questionRoutes = require('./questions');

router.use('/user', userRoutes);
router.use('/courses', courseRoutes);
router.use('/coursewares', coursewareRoutes);
router.use('/review-cards', reviewCardRoutes);
router.use('/questions', questionRoutes);

// TODO: Add API routes here
router.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = router;