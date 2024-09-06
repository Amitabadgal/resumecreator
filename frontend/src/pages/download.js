import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Download = ({ resumeData }) => {
  const resumeRef = useRef();

  const handleDownload = async () => {
    if (!resumeRef.current) return;
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

    try {
      const response = await axios.post('https://resumecreator-u9et.onrender.com/api/auth/save-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resume saved successfully', response.data);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  if (!resumeData || !resumeData.personalDetails) {
    console.log(resumeData.personalDetails);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div ref={resumeRef} className="resume">
        <h1>{resumeData.personalDetails.fullName}</h1>
        {/* Render the rest of the resume */}
      </div>
      
      <button 
        className="btn bg-blue-500 text-white p-2 rounded mt-4"
        onClick={handleDownload}
      >
        Download Resume as PDF
      </button>
    </div>
  );
};

export default Download;
