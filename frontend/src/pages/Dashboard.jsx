import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header1 from '../components/header1';
import backgroundImage from './bg101.jpg';

const buttonStyle = {
  backgroundColor: '#2697d1',
  color: 'white',
  padding: '1rem',
  borderRadius: '0.375rem',
  transition: 'background-color 0.2s',
  fontSize: '1.2rem',
  margin: '10px',
  width: '200px',
};
const appStyle = {
  position: 'fixed', // Fixed position to keep the container in place
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  overflow: 'hidden', // Prevent scrolling
};

const contentStyle = {
  position: 'fixed', // Keep the content fixed in the center
  zIndex: 2,
  display: 'flex',
  justifyContent: 'justify-between',
  //alignItems: 'center',
  height: '100%',
  width: '100%',
  padding: '20px',
  color: '#fff',
};

const backgroundOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `url(${backgroundImage}) no-repeat center center fixed`,
  backgroundSize: '100% 100%',
  zIndex: 1,
};

const Dashboard = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isRightSectionVisible, setIsRightSectionVisible] = useState(false);

  const handleButtonClick = () => {
    setIsRightSectionVisible(!isRightSectionVisible);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      axios.get(`https://resumecreator-u9et.onrender.com/api/auth/resumes/${userId}`)
        .then(response => {
          setResumeData(response.data); // Store the data in state
          console.log(response.data); // Log the data to inspect it
        })
        .catch(error => {
          console.error('Error fetching resume data:', error);
        });
    }
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

   const hasResumeData = resumeData.personalDetails || 
                        resumeData.education.length > 0 || 
                        resumeData.experience.length > 0 || 
                        resumeData.projects.length > 0 || 
                        resumeData.skills.length > 0 || 
                        resumeData.achievements.length > 0 || 
                        resumeData.software.length > 0 || 
                        resumeData.languages.length > 0 || 
                        resumeData.certifications.length > 0 || 
                        resumeData.interests.length > 0 || 
                        resumeData.others;

  return (
    <div style={appStyle}>
    <Header1 />
    <div style={backgroundOverlayStyle}></div>
    <div style={contentStyle}>
    <div className="dashboard flex-col">
    <h2 style={{ textAlign: 'center', marginTop: '100px', fontSize: '1.5rem', color: '#0e6fa0' }}>
          Welcome, {resumeData.personalDetails.fullName}!
        </h2>
    
      <div>
        {/* Horizontal button container */}
        <div className="flex space-x-4 mt-4 ml-32 mr-32 justify-between left-section  p-8">
          <button style={buttonStyle} onClick={handleButtonClick}>Edit Details</button>

          <Link to="/create" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>Add Details</button>
          </Link>
          <Link to="/template-selector" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>Select Template</button>
          </Link>

          <Link to="/viewresume" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>View Resumes</button>
          </Link>
          
        </div>
      </div>
     {isRightSectionVisible && (
  <div className='right-section bg-blue-400 p-4 overflow-y-auto h-1/2 fixed top-30 rounded border border-gray-300'>
    {hasResumeData ? (
      <>
        <h1 className="text-lg font-bold"><strong>{resumeData.personalDetails.fullName}'s Resume</strong></h1>
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Personal Details</legend>
          <p><strong>Full Name:</strong> {resumeData.personalDetails.fullName}</p>
          <p><strong>Email:</strong> {resumeData.personalDetails.email}</p>
          <p><strong>Phone:</strong> {resumeData.personalDetails.phone}</p>
          <p><strong>Address:</strong> {resumeData.personalDetails.address}</p>
          <p><strong>Title:</strong> {resumeData.personalDetails.title}</p>
          <p><strong>Summary:</strong> {resumeData.personalDetails.summary}</p>
          <p><strong>LinkedIn:</strong> {resumeData.personalDetails.linkedin}</p>
        </fieldset>
       <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Educational Details</legend>
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Year:</strong> {edu.year}</p>
                <p><strong>Details:</strong> {edu.details}</p>
              </div>
            ))}
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Experience Details</legend>
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                <p><strong>Organisation:</strong> {exp.organisation}</p>
                <p><strong>Position:</strong> {exp.position}</p>
                <p><strong>Year:</strong> {exp.year}</p>
                <p><strong>Details:</strong> {exp.details}</p>
              </div>
            ))}
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Projects</legend>
            {resumeData.projects.map((project, index) => (
              <div key={index}>
                <p><strong>Title:</strong> {project.title}</p>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Year:</strong> {project.year}</p>
              </div>
            ))}
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Skills</legend>
            <ul>
              {resumeData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Achievements</legend>
            <ul>
              {resumeData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Softwares</legend>
            {resumeData.software.map((software, index) => (
              <div key={index}>
                <p><strong>Name:</strong> {software.name}</p>
                <p><strong>Level:</strong> {software.level}</p>
              </div>
            ))}
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Languages</legend>
            {resumeData.languages.map((language, index) => (
              <div key={index}>
                <p><strong>Name:</strong> {language.name}</p>
                <p><strong>Level:</strong> {language.level}</p>
              </div>
            ))}
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Certificates</legend>
            <ul>
    {resumeData.certifications.map((cert, index) => (
        <li key={index}>
            <span>{cert.name}</span>
            <span>{cert.year}</span>
        </li>
    ))}
</ul>
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Interests</legend>
            <ul>
              {resumeData.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="border border-gray-200 rounded p-4">
            <legend className="text-lg font-semibold mb-2">Others</legend>
            <p>{resumeData.others}</p>
          </fieldset>
 
      </>
    ) : (
      <div style={{ textAlign: 'center', color: '#fff', fontSize: '1.5rem' }}>
        <p>No data available. Please add details.</p>
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>Add Details</button>
        </Link>
      </div>
    )}
  </div>
)}

    </div>
    </div>
    </div>
  );
};

export default Dashboard;
