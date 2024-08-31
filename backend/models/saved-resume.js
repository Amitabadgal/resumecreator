const mongoose = require('mongoose');

const savedResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedResume = mongoose.model('SavedResume', savedResumeSchema);

module.exports = SavedResume;
