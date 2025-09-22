const Courseware = require("../models/coursewares");
const ReviewCard = require("../models/questions");

// Create a new courseware
const courseware = require("../mock/courseware.json");
const coursewares = require("../mock/coursewares.json");

exports.createCourseware = async (req, res) => {
  try {
    // should take from the AI API
    //mock data for now
    const { text, quiz } = courseware;
    const title = coursewares[0];
    const newCourseware = new Courseware({
      title,
      text,
      quiz,
      createdBy: req.user.id,
    });
    await newCourseware.save();
    //update the user's createdCoursewares array
    req.user.myCurrentCoursewares.push({
      courseId: newCourseware._id,
      title: newCourseware.title,
    });
    await req.user.save();
    res.status(201).json({
      message: "Courseware created successfully",
      courseware: newCourseware,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all coursewares
exports.getAllCoursewares = async (req, res) => {
  try {
    const coursewares = await Courseware.find();
    res.json(coursewares);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a courseware by ID
exports.getCoursewareById = async (req, res) => {
  try {
    const courseware = await Courseware.findById(req.params.id);
    if (!courseware)
      return res.status(404).json({ message: "Courseware not found" });
    res.json(courseware);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a courseware by ID
exports.updateCourseware = async (req, res) => {
  try {
    const courseware = await Courseware.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!courseware)
      return res.status(404).json({ message: "Courseware not found" });
    res.json(courseware);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a courseware by ID
exports.deleteCourseware = async (req, res) => {
  try {
    const courseware = await Courseware.findByIdAndDelete(req.params.id);
    if (!courseware)
      return res.status(404).json({ message: "Courseware not found" });
    res.json({ message: "Courseware deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
