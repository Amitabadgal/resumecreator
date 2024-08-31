const Resume = require('../models/Resume');

exports.createOrUpdateResume = async (req, res) => {
  try {
    const { userId, content } = req.body;

    let resume = await Resume.findOne({ userId });
    if (resume) {
      resume.content = content;
      await resume.save();
      return res.status(200).json(resume);
    }

    resume = new Resume({ userId, content });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
