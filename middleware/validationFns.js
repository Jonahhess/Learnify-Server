const {
  validateCourse,
  validateCourseware,
  validateQuestion,
  validateReviewCard,
  validateUser,
} = require("../validation/ajvSetup.js");

function courseValidation(req, res, next) {
  const valid = validateCourse(req.body);
  if (valid) {
    next();
  } else {
    console.log(validateCourse.errors);
    const error = new Error("course validation error");
    error.status = 400;
    error.message = validateCourse.errors[0].message;
    next(error);
  }
}
function coursewareValidation(req, res, next) {
  const valid = validateCourseware(req.body);
  if (valid) {
    next();
  } else {
    console.log(validateCourseware.errors);
    const error = new Error("courseware validation error");
    error.status = 400;
    error.message = validateCourseware.errors[0].message;
    next(error);
  }
}
function questionValidation(req, res, next) {
  const valid = validateQuestion(req.body);
  if (valid) {
    next();
  } else {
    console.log(validateQuestion.errors);
    const error = new Error("question validation error");
    error.status = 400;
    error.message = validateQuestion.errors[0].message;
    next(error);
  }
}
function reviewCardValidation(req, res, next) {
  const valid = validateReviewCard(req.body);
  if (valid) {
    next();
  } else {
    console.log(validateReviewCard.errors);
    const error = new Error("review card validation error");
    error.status = 400;
    error.message = validateReviewCard.errors[0].message;
    next(error);
  }
}
function userValidation(req, res, next) {
  const valid = validateUser(req.body);
  if (valid) {
    next();
  } else {
    console.log(validateUser.errors);
    const error = new Error("user validation error");
    error.status = 400;
    error.message = validateUser.errors[0].message;
    next(error);
  }
}

module.exports = {
  courseValidation,
  coursewareValidation,
  questionValidation,
  reviewCardValidation,
  userValidation,
};
