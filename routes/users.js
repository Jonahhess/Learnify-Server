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
router.post("/:id/courses", auth, startCourse);

// Submit Courseware by id
router.put("/:id/coursewares/:coursewareId", auth, submitCourseware);

// Start Courseware by Id
router.post("/:id/coursewares", auth, startCourseware);

// Submit Review Cards
router.post("/:id/reviewcards", auth, batchSubmitReviewCards);

// end of app section

// Get a user by ID
router.get("/:id", auth, getUserById);

// Update a user by ID
router.put("/:id", auth, updateUser);

// Delete a user by ID
router.delete("/:id", auth, deleteUser);

module.exports = router;
