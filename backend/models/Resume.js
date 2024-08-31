const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    title: String,
    summary: String,
    linkedin:String,
  },
  education: [
    { degree: String, institution: String, year1: String, year2: String, details: String },
  ],
  experience: [
    { organisation: String, position: String, year1: String, year2: String, details: String },
  ],
  projects: [
    { title: String, description: String, year: String },
  ],
  skills: [String],
  achievements: [String],
  software:[{name: String, level: String}],
  languages:[{name: String, level: String}],
  certifications: [{name:String, year:String}],
  interests: [String],
  others: String,
});

module.exports = mongoose.model('Resume', ResumeSchema);
