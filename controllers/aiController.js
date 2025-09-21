const {
  generateCourseOutlineFromTitle,
  generateCoursewareFromTitle,
  generateFullCourseByTitle,
} = require("../services/aiService");

const Course = require("../models/courses");
const Courseware = require("../models/coursewares");
const Question = require("../models/questions");

exports.generateCourseOutline = async (req, res) => {
  try {
    const { title } = req.body;
    const outline = await generateCourseOutlineFromTitle(title);
    const toJson = JSON.parse(outline);
    const coursewares = toJson.map((title) => {
      title;
    });

    const newCourse = await Course.create({ title, coursewares });

    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateCourseware = async (req, res) => {
  try {
    const { courseTitle, courseId, title } = req.body;
    const courseware = await generateCoursewareFromTitle(courseTitle, title);
    const toJson = JSON.parse(courseware);
    const { text, quizEntries } = toJson;

    const coursewareId = new mongoose.Types.ObjectId();

    const promises = [];
    for (const question of quizEntries) {
      promises.push(
        Question.create({
          coursewareId,
          ...question,
        })
      );
    }
    const all = await Promise.allSettled(promises);
    const quiz = all
      .filter((p) => p.status === '"fulfilled"')
      .map((f) => f.value);

    const newCourseware = await Courseware.create({
      title,
      text,
      quiz,
      courseId,
    });

    res.json(newCourseware);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateFullCourse = async (req, res) => {
  // try {
  //   // const { title } = req.body;
  //   // const course = await generateFullCourseByTitle(title);
  //   // res.json(course.map((c) => JSON.parse(c)));
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};
