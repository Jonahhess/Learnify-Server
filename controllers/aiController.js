const {
  generateCourseOutlineFromTitle,
  generateCoursewareFromTitle,
  generateFullCourseByTitle,
} = require("../services/aiService");

const Course = require("../models/courses");
const Courseware = require("../models/coursewares");
const Question = require("../models/questions");
const User = require("../models/users");

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
    const newCourseware = await this.doGenerateCourseware(
      title,
      newCourse._id,
      coursewares[0].title
    );

    newCourse.updateOne(
      { "coursewares.id": 0 },
      { $set: { "coursewares.$.coursewareId": newCourseware._id } }
    );
    await newCourse.save();

    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.doGenerateCourseware = async (courseTitle, courseId, title) => {
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
    _id: coursewareId,
    title,
    text,
    quiz: quizFiltered,
    courseId: new mongoose.Types.ObjectId(courseId),
    index,
  });

  if (index < 0 || index > courseToUpdate.coursewares.length) {
    throw { message: "impossible! index out of bounds!" };
  }

  courseToUpdate.coursewares.splice(index, 1, {
    ...courseToUpdate.coursewares[index],
    title,
    coursewareId,
  });
  await courseToUpdate.save();

  // TODO update user that current courseware should now have link to coursewareId (like above)
  await User.updateMany(
    {
      "myCurrentCoursewares.courseId": newCourseware.courseId,
      "myCurrentCoursewares.title": newCourseware.title,
    },
    {
      $set: {
        "myCurrentCoursewares.$[elem].coursewareId": newCourseware._id,
      },
    },
    {
      arrayFilters: [
        {
          "elem.courseId": newCourseware.courseId,
          "elem.title": newCourseware.title,
        },
      ],
    }
  );

  return newCourseware;
};

exports.generateCourseware = async (req, res) => {
  try {
    const { courseTitle, courseId, title } = req.body;
    const newCourseware = await doGenerateCourseware(
      courseTitle,
      courseId,
      title
    );

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
