const {
  generateCourseOutlineFromTitle,
  generateCoursewareFromTitle,
  generateFullCourseByTitle,
} = require('../services/aiService');

exports.generateCourseOutline = async (req, res) => {
  try {
    const { title } = req.body;
    const outline = await generateCourseOutlineFromTitle(title);
    res.json(JSON.parse(outline));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateCourseware = async (req, res) => {
  try {
    const { courseTitle, title } = req.body;
    const courseware = await generateCoursewareFromTitle(courseTitle, title);
    res.json(JSON.parse(courseware));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateFullCourse = async (req, res) => {
  try {
    const { title } = req.body;
    const course = await generateFullCourseByTitle(title);
    res.json(course.map(c => JSON.parse(c)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
