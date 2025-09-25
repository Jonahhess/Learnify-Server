const {
  generateCourseOutlineFromTitle,
  generateCoursewareFromTitle,
  generateFullCourseByTitle,
} = require("../services/aiService");

const Course = require("../models/courses");
const Courseware = require("../models/coursewares");
const Question = require("../models/questions");
const { default: mongoose } = require("mongoose");

exports.generateCourseOutline = async (req, res) => {
  try {
    const { title } = req.body;
    const outline = await generateCourseOutlineFromTitle(title);
    const toJson = JSON.parse(outline);
    const coursewares = toJson.map((courseTitle) => {
      return {
        title: courseTitle,
      };
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

    const courseToUpdate = await Course.findOne({
      title: courseTitle,
      _id: courseId,
      "coursewares.title": title,
    });

    if (!courseToUpdate) {
      throw { message: "course not found" };
    }

    const index = courseToUpdate.coursewares.findIndex(
      (cw) => cw.title === title
    );

    const courseware = await generateCoursewareFromTitle(courseTitle, title);

    const toJson = JSON.parse(courseware);
    const { text, quiz } = toJson;

    const coursewareId = new mongoose.Types.ObjectId();

    const promises = [];
    for (const question of quiz) {
      promises.push(
        Question.create({
          coursewareId,
          courseId: new mongoose.Types.ObjectId(courseId),
          ...question,
        })
      );
    }
    const all = await Promise.allSettled(promises);

    const quizFiltered = all
      .filter((p) => p.status === "fulfilled")
      .map((f) => f.value)
      .map((q) => {
        return { questionText: q.questionText, questionId: q._id };
      });

    const newCourseware = await Courseware.create({
      title,
      text,
      quiz: quizFiltered,
      courseId: new mongoose.Types.ObjectId(courseId),
      index,
    });

    if (index < 0 || index > courseToUpdate.coursewares.length) {
      throw { message: "impossible! index out of bounds!" };
    }

    courseToUpdate.coursewares[index]._doc.coursewareId = coursewareId;
    await courseToUpdate.save();

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
