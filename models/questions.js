const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  coursewareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courseware',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  incorrectAnswers: {
    type: [String],
    required: true
  },
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
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('questions', questionSchema);
