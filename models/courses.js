const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coursewares: [
      {
        courswareId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Courseware",
        },
        title: { type: String, required: true },
      },
    ],
    stats: {
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
    },
    keywords: {
      type: [String],
    },
  },
  coursewares: [{
    type: Object,
    ref: 'Courseware',
    title: String,
    required: true
  }],
  stats: {
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  }
);

module.exports = mongoose.model('courses', courseSchema);
