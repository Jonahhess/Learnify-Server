const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const courseRoutes = require('./courses');

router.use('/user', userRoutes);
router.use('/courses', courseRoutes);

// TODO: Add API routes here
router.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = router;