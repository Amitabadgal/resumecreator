import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header1 from '../components/header1';

const extractFilename = (filePath) => {
  return filePath.split(/[/\\]/).pop(); 
};

const appStyle = {
  //position: 'fixed', // Fixed position to keep the container in place
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  margin: 0,
  padding: 0,
  //overflow: 'hidden', // Prevent scrolling
  background: 'linear-gradient(to bottom right, #80c8ed, #d5e1e8)',
};

const contentStyle = {
  paddingTop: '80px', // Adjust padding to accommodate the fixed header
  paddingLeft: '20px',
  paddingRight: '20px',
};

const resumeBoxStyle = {
  border: '2px solid #2697d1', // Border color matches the header text color
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: 'white', // Background color of the box
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a slight shadow for depth
};

const Viewresume = () => {
  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeSrc, setResumeSrc] = useState(''); // State to hold the full src URL

  useEffect(() => {
    axios.get('https://resumecreator-u9et.onrender.com/api/auth/save-resume')
      .then(response => setSavedResumes(response.data))
      .catch(() => alert('Failed to load resumes'));
  }, []);

  const handleViewResume = (filePath) => {
    const fileName = extractFilename(filePath);
    const fullSrc = `https://resumecreator-u9et.onrender.com/api/auth/save-resume/${fileName}`;
    setSelectedResume(fileName);
    setResumeSrc(fullSrc); // Set the full URL as the src
  };

  return (
    <div style={appStyle}>
    <Header1 style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
    <div style={contentStyle}>
      <h2 style={{ fontSize: '1.5rem', color: '#0e6fa0'}}>Saved Resumes</h2>
      <ul>
        {savedResumes.map((resume, index) => (
          <li key={index} style={resumeBoxStyle}>
            <h2>File Name: {extractFilename(resume.filePath) || 'No file path available'}</h2>
            <p>Created At: {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'Date not available'}</p>
            {resume.filePath && (
              <div>
                <button 
                  onClick={() => handleViewResume(resume.filePath)} 
                  style={{ marginLeft: '10px', fontSize: '1.15rem', color: '#2697d1'}}
                >
                  View Resume
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Display selected resume using iframe */}
      {resumeSrc && (
  <div className="resume-viewer">
    <iframe
      src={resumeSrc}
      width="100%"
      height="600px"
      title="PDF Viewer"
      style={{ border: 'none', marginTop: '20px' }}
    />
  </div>
)}
    </div>
    </div>
  );
};

export default Viewresume;
