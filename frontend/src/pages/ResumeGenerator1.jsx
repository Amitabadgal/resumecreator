import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './printStyles.css';
import Header1 from '../components/header1';

const buttonStyle = {
  backgroundColor: '#2563EB',
  color: 'white',
  padding: '1rem',
  borderRadius: '0.375rem',
  transition: 'background-color 0.2s',
  fontSize: '1.2rem',
  margin: '10px',
  width: '200px',
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
const ResumeGenerator1 = ({ selectedTemplate, userId }) => {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const resumeRef = useRef(); // Reference to the resume element

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/auth/resumes/${userId}`)
        .then(response => {
          setResumeData(response.data);
        })
        .catch(error => {
          setError(error.response?.data?.message || 'Error fetching resume');
        });
    }
  }, [userId]);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
  
    const button = document.querySelector('.no-print');
    if (button) button.style.display = 'none';
  
    const resumeElement = resumeRef.current;
    const canvas = await html2canvas(resumeElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // Width of A4 paper in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('resume.pdf');
  
    const pdfBlob = pdf.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'resume.pdf');
    formData.append('userId', userId);
    formData.append('resumeName', 'My Generated Resume');
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/save-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resume saved successfully', response.data);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  
    if (button) button.style.display = '';
  };
  

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={appStyle}>
    <Header1 style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
    <div style={contentStyle}>
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 font-sans" ref={resumeRef}>
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-[#003d74] pb-8">
          <div className='pl-6 pr-6 mb-8 mt-4'>
            <h1 className="text-2xl font-bold text-white">{resumeData.personalDetails.fullName}</h1>
            <h2 className="text-xl text-white">{resumeData.personalDetails.title}</h2>
          </div>
          <div className="bg-[#053056] w-100">
            <h3 className="text-xl font-semibold text-white pl-6 border-white pb-2">Personal Info</h3>
          </div>
          <div className='pl-6 pr-6 mt-4 mb-8'>
            <p className="text-l font-semibold text-white mb-2"><strong>Address</strong><br/>{resumeData.personalDetails.address}</p>
            <p className="text-l font-semibold text-white mb-2"><strong>Phone</strong><br/>{resumeData.personalDetails.phone}</p>
            <p className="text-l font-semibold text-white mb-2"><strong>Email</strong><br/>{resumeData.personalDetails.email}</p>
            <p className="text-l font-semibold text-white"><strong>LinkedIn</strong><br/><a href={resumeData.personalDetails.linkedin} className="text-white">{resumeData.personalDetails.linkedin}</a></p>
          </div>
          <div className="bg-[#053056] w-100">
            <h3 className="text-xl font-semibold text-white pl-6 border-white pb-2">Skills</h3>
          </div>
          <div className='pl-6 pr-6 mt-4 mb-8'>
            <ul className="list-disc list-inside">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="text-white">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#053056] w-100">
            <h3 className="text-xl font-semibold text-white pl-6 pb-2">Software</h3>
          </div>
          <div className="pl-6 pr-6 mt-8 mb-4">
  <ul className="space-y-4">
    {resumeData.software.map((software, index) => (
      <li key={index} className="flex flex-col">
        <span className="text-white">{software.name}</span>
        <div className="bg-[#053056] h-2  w-full mt-2"> {/* Background color of the bar */}
          <div
            className="h-full "
            style={{
              width: `${software.level}%`, // Use percentage for filling
              backgroundColor: 'white', // Set the desired color for the filled portion
            }}
          ></div>
        </div>
      </li>
    ))}
  </ul>
</div>

          <div className="bg-[#053056] w-100">
            <h3 className="text-xl font-semibold text-white pl-6 pb-2">Languages</h3>
          </div>
          <div className='pl-6 pr-6 mt-4 mb-8'>
  <ul className="space-y-2">
    {resumeData.languages.map((language, index) => (
      <li key={index} className="flex flex-col">
        <span className="text-white">{language.name}</span>
        <div className="bg-[#053056] h-2  w-full mt-2"> {/* Background color of the bar */}
          <div
            className="h-full "
            style={{
              width: `${language.level}%`, // Use percentage for filling
              backgroundColor: 'white', // Set the desired color for the filled portion
            }}
          ></div>
        </div>
      </li>
    ))}
  </ul>
</div>

        </div>
        {/* Right Column */}
        <div className="w-2/3  pl-6">
          <p className="text-gray-700">{resumeData.personalDetails.summary}</p>
          <div className=" mt-8">
            <h3 className="text-xl font-bold text-[#053056] border-b-2 border-t-2 border-gray-300 pb-2">Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className=" flex">
               <div className="w-1/4">
                <div className="flex items-center space-x-1">
    <h4 className="text-sm font-medium text-gray-700">{exp.year1}</h4>
    <h4 className="text-sm font-medium text-gray-700">-</h4>
    </div>
    <h4 className="text-sm font-medium text-gray-700">{exp.year2}</h4>
</div>
<div className='w-3/4'>
                <h4 className="text-sm font-medium text-gray-700"><strong>{exp.position}</strong></h4>
                <h4 className="text-sm font-medium text-gray-700">{exp.organisation}</h4>
                <ul className="list-disc pl-5 text-gray-600">
                    {exp.details.split('\n').map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className=" mt-8">
            <h3 className="text-xl font-bold text-[#053056] border-b-2 border-t-2 border-gray-300 pb-2">Education</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 flex">
               <div className="w-1/4">
                <div className="flex items-center space-x-1">
    <h4 className="text-sm font-medium text-gray-700">{edu.year1}</h4>
    <h4 className="text-sm font-medium text-gray-700">-</h4>
    </div>
    <h4 className="text-sm font-medium text-gray-700">{edu.year2}</h4>
</div>
<div className='w-3/4'>
                <h4 className="text-sm font-medium text-gray-700"><strong>{edu.degree}</strong>,<strong> {edu.institution}</strong></h4>
                <ul className="list-disc pl-5 text-gray-600">
                    {edu.details.split('\n').map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                </div>
              </div>
            ))}
          </div>
          <div>
    <h3 className="text-xl font-bold text-[#053056] border-b-2 border-t-2 border-gray-300 pb-2">Certificates</h3>
    <ul className="space-y-2">
        {resumeData.certifications.map((cert, index) => (
            <li key={index} className="flex ">
               <span className="text-gray-900">
    <span className="mr-20">{cert.year}</span>
    <span>{cert.name}</span>
</span>
               
            </li>
        ))}
    </ul>
</div>

          <div>
            <h3 className="text-xl font-bold text-[#053056] border-b-2 border-t-2 border-gray-300 pb-2">Interests</h3>
            <ul>
            {resumeData.interests.map((int, index) => (
                <li key={index} className="text-gray-900 ml-32">{int}</li>
              ))}
           </ul>
          </div>
        </div>
      </div>
      <button className="no-print" style={buttonStyle} onClick={handleDownload}>Download as PDF</button>
    </div>
    </div>
    </div>
  );
};

export default ResumeGenerator1;