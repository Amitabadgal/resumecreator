const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const SavedResume = require('../models/saved-resume');

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, confirmpassord } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ username, email, password, confirmpassord });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save or update a resume
router.post('/resumes', async (req, res) => {
  try {
    const { userId, content } = req.body;

    let resume = await Resume.findOne({ userId });
    if (resume) {
      resume.personalDetails = content.personalDetails;
      resume.education = content.education;
      resume.experience = content.experience;
      resume.projects = content.projects;
      resume.skills = content.skills;
      resume.achievements = content.achievements;
      resume.software = content.software;
      resume.languages = content.languages;
      resume.certifications = content.certifications;
      resume.interests =content.interests;
      resume.others = content.others;
      await resume.save();
      return res.status(200).json(resume);
    }

    resume = new Resume({ userId, ...content });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch resume data by userId
router.get('/resumes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const resume = await Resume.findOne({ userId });
    console.log('userId');

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/save-resume', upload.single('pdf'), async (req, res) => {
  try {
    const { userId, resumeName } = req.body;
    const pdfFile = req.file;

    if (!pdfFile) {
      return res.status(400).send('No file uploaded');
    }

    const savedResume = new SavedResume({
      userId,
      resumeName,
      filePath: pdfFile.path, // Store the file path in the database
    });

    await savedResume.save();

    res.status(201).json({ message: 'Resume saved successfully', data: savedResume });
  } catch (error) {
    res.status(500).json({ message: 'Error saving resume', error: error.message });
  }
});

router.get('/save-resume', async (req, res) => {
  try {
    const resumes = await SavedResume.find(); // Fetch all saved resumes
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
});
router.get('/save-resume/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});



module.exports = router;
