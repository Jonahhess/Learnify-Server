const convertBsonSchemaToJsonSchema = require("../utils/bson-schema-to-json-schema");
const normalizeMongoDoc = require("./utils/bson-object-to-json-object");

const Ajv = require("ajv");
const ajv = new Ajv();

// mongo bson schemas
const coursesSchema = require("../schemas/courses.json");
const coursewaresSchema = require("../schemas/courseswares.json");
const questionsSchema = require("../schemas/questions.json");
const reviewCards = require("../schemas/reviewCards.json");
const userSchema = require("../schemas/users.json");

// converted to json schemas
const jsonCourseSchema = convertBsonSchemaToJsonSchema(coursesSchema);
const jsonCoursewaresSchema = convertBsonSchemaToJsonSchema(coursewaresSchema);
const jsonQuestionsSchema = convertBsonSchemaToJsonSchema(questionsSchema);
const jsonReviewCardsSchema = convertBsonSchemaToJsonSchema(reviewCards);
const jsonUsersSchema = convertBsonSchemaToJsonSchema(userSchema);

// compiling json schemas
const validateCourseRaw = ajv.compile(jsonCourseSchema);
const validateCoursewareRaw = ajv.compile(jsonCoursewaresSchema);
const validateQuestionRaw = ajv.compile(jsonQuestionsSchema);
const validateReviewCardRaw = ajv.compile(jsonReviewCardsSchema);
const validateUserRaw = ajv.compile(jsonUsersSchema);

// wrapping validation in normalize fn
const validateCourse = (data) => validateCourseRaw(normalizeMongoDoc(data));
const validateCourseware = (data) =>
  validateCoursewareRaw(normalizeMongoDoc(data));
const validateQuestion = (data) => validateQuestionRaw(normalizeMongoDoc(data));
const validateReviewCard = (data) =>
  validateReviewCardRaw(normalizeMongoDoc(data));
const validateUser = (data) => validateUserRaw(normalizeMongoDoc(data));

module.exports = {
  validateCourse,
  validateCourseware,
  validateQuestion,
  validateReviewCard,
  validateUser,
};
