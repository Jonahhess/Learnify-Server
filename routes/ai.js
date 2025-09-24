const express = require("express");
const router = express.Router();
const {
  generateCourseOutline,
  generateCourseware,
  generateFullCourse,
} = require("../controllers/aiController");

router.post("/outline", generateCourseOutline);

router.post("/courseware", generateCourseware);

router.post("/full-course", generateFullCourse);

module.exports = router;
