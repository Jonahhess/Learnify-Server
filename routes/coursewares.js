const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createCourseware,
  getAllCoursewares,
  getCoursewareById,
  updateCourseware,
  deleteCourseware,
  submitCourseware,
} = require("../controllers/coursewaresController");

// Create a new courseware
router.post("/", auth, createCourseware);

// Get all coursewares
router.get("/", getAllCoursewares);

// Get a courseware by ID
router.get("/:id", getCoursewareById);

// Update a courseware by ID
router.put("/:id", auth, updateCourseware);

router.post("/:id", auth, submitCourseware);

// Delete a courseware by ID
router.delete("/:id", auth, deleteCourseware);

module.exports = router;
