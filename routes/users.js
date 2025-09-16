
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createUser, 
  loginUser,
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Login a user
router.post('/login', loginUser);

// Get a user by ID
router.get('/:id', auth, getUserById);

// Update a user by ID
router.put('/:id', auth, updateUser);

// Delete a user by ID
router.delete('/:id', auth, deleteUser);

module.exports = router;
