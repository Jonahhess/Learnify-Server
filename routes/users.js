const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validateNewUser = require("../middleware/validateNewUser");
const {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  startCourse,
  startCourseware,
  submitCourseware,
  batchSubmitReviewCards,
} = require("../controllers/userController");

// Create a new user
router.post("/", validateNewUser, createUser);

// Login a user
router.post("/login", loginUser);

// interacting with the app

// Add Course to user by Id
router.post("/course/:id", auth, startCourse);

// Submit Courseware by Id
router.post("/coursewares/:id", auth, startCourseware);

router.post("/coursewares/:id/submit", auth, submitCourseware);

// Submit Review Cards
router.post("/review", auth, batchSubmitReviewCards);

// end of app section

// Get a user by ID
router.get("/:id", auth, getUserById);

// Update a user by ID
router.put("/:id", auth, updateUser);

// Delete a user by ID
router.delete("/:id", auth, deleteUser);

module.exports = router;
