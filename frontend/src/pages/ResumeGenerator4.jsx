import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeGenerator4 = ({ selectedTemplate, userId }) => {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null); // State for error message
  const [underConstruction, setUnderConstruction] = useState(false); // State for under construction message

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/auth/resumes/${userId}`)
        .then(response => {
          setResumeData(response.data);
          console.log(response);
        })
        .catch(error => {
          setError(error.response?.data?.message || 'Error fetching resume');
        });
    }
  }, [userId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  

  return (
    <div>
      <h1>UnderConstruction</h1>
    </div>
  );
};

export default ResumeGenerator4;
