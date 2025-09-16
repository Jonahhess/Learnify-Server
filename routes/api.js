const express = require('express');
const router = express.Router();

const userRoutes = require('./users');

router.use('/user', userRoutes);

// TODO: Add API routes here
router.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = router;