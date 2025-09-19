const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');
router.use(auth)

// Create a new course
router.post('/', createCourse);

// Get all courses
router.get('/', getAllCourses);

// Get a course by ID
router.get('/:id', getCourseById);

// Update a course by ID
router.put('/:id', updateCourse);

// Delete a course by ID
router.delete('/:id', deleteCourse);

module.exports = router;
