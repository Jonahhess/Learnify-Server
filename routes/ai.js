const express = require("express");
const router = express.Router();
const {
  generateCourseOutline,
  generateCourseware,
  generateFullCourse,
} = require("../controllers/aiController");
const auth = require("../middleware/auth");

router.post("/outline", auth, generateCourseOutline);

router.post("/courseware", auth, generateCourseware);

router.post("/full-course", auth, generateFullCourse);

module.exports = router;
