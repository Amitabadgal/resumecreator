import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Header1 from '../components/header1';

const CreateResume = () => {
  const navigate = useNavigate(); 
  const appStyle = {
   //position: 'fixed', // Fixed position to keep the container in place
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    //overflow: 'hidden', // Prevent scrolling
    background: 'linear-gradient(to bottom right, #80c8ed, #d5e1e8)',
  };

  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      title:'',
      summary:'',
      linkedin:''
    },
    education: [{ degree: '', institution: '', year1: '', year2: '', details:'' }],
    experience: [{ organisation: '', position: '', year1: '', year2: '', details:'' }],
    projects: [{ title: '', description: '', year: '' }],
    skills: [''],
    achievements: [''],
    software:[{name:'', level:''}],
    languages:[{name:'', level:''}],
    certifications:[{name:'', year:'' }],
    interests:[''],
    others: ''
  });
 
  
  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section === 'personalDetails') {
      setFormData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, [name]: value },
      }));
    } else if (['education', 'experience', 'projects', 'software', 'languages', 'certifications'].includes(section)) {
      const updatedItems = [...formData[section]];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setFormData(prev => ({ ...prev, [section]: updatedItems }));
    } else {
      setFormData(prev => ({ ...prev, [section]: value }));
    }
  };

  const addField = (section) => {
    setFormData(prev => ({ ...prev, [section]: [...prev[section], {}] }));
  };

  const removeField = (section, index) => {
    setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Ensure you have the userId

    await axios.post('https://resumecreator-u9et.onrender.com/api/auth/resumes', { userId, content: formData }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    alert('Resume saved successfully');
    navigate('/dashboard');
  };

  return (
    <div style={appStyle}>
    <Header1 />
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Resume Data</h2>
     
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
        {/* Personal Details */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Personal Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.personalDetails.fullName}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.personalDetails.title}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.personalDetails.summary}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.personalDetails.email}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.personalDetails.phone}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                Linkedin
              </label>
              <input
                type="text"
                id="linkedin "
                name="linkedin"
                value={formData.personalDetails.linkedin}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.personalDetails.address}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows="3"
              ></textarea>
            </div>
          </div>
        </fieldset>

        {/* Educational Details */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Educational Details</legend>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  id={`degree-${index}`}
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleChange(e, 'education', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  name="institution"
                  value={edu.institution || ''}
                  onChange={(e) => handleChange(e, 'education', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`year1-${index}`} className="block text-sm font-medium text-gray-700">
                  Start Year
                </label>
                <input
                  type="text"
                  id={`year1-${index}`}
                  name="year1"
                  value={edu.year1 || ''}
                  onChange={(e) => handleChange(e, 'education', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`year2-${index}`} className="block text-sm font-medium text-gray-700">
                  End Year
                </label>
                <input
                  type="text"
                  id={`year2-${index}`}
                  name="year2"
                  value={edu.year2 || ''}
                  onChange={(e) => handleChange(e, 'education', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`details-${index}`} className="block text-sm font-medium text-gray-700">
                  Detail
                </label>
                
                <textarea
                id={`details-${index}`}
                 name="details"
               value={formData.education.details}
               onChange={(e) => handleChange(e, 'education', index)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 rows="3"
               placeholder="Enter details. Use a new line for each point."
                 ></textarea>
                
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeField('education', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addField('education')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Education
            </button>
          </div>
        </fieldset>

        {/* Experience Details */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Experience Details</legend>
          {formData.experience.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`organisation-${index}`} className="block text-sm font-medium text-gray-700">
                  Organisation
                </label>
                <input
                  type="text"
                  id={`organisation-${index}`}
                  name="organisation"
                  value={exp.organisation || ''}
                  onChange={(e) => handleChange(e, 'experience', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  id={`position-${index}`}
                  name="position"
                  value={exp.position || ''}
                  onChange={(e) => handleChange(e, 'experience', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`year1-${index}`} className="block text-sm font-medium text-gray-700">
                  Start Year
                </label>
                <input
                  type="text"
                  id={`year1-${index}`}
                  name="year1"
                  value={exp.year1 || ''}
                  onChange={(e) => handleChange(e, 'experience', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`year2-${index}`} className="block text-sm font-medium text-gray-700">
                 End Year
                </label>
                <input
                  type="text"
                  id={`year2-${index}`}
                  name="year2"
                  value={exp.year2 || ''}
                  onChange={(e) => handleChange(e, 'experience', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor={`details-${index}`} className="block text-sm font-medium text-gray-700">
                  Detail
                </label>
                <textarea
              id={`details-${index}`}
              name="details"
               value={formData.experience.details}
              onChange={(e) => handleChange(e, 'experience', index)}
             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
             rows="3"
             placeholder="Enter details. Use a new line for each point."
            ></textarea>
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeField('experience', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addField('experience')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Experience
            </button>
          </div>
        </fieldset>

        {/* Projects */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Projects</legend>
          {formData.projects.map((proj, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name="title"
                  value={proj.title || ''}
                  onChange={(e) => handleChange(e, 'projects', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id={`description-${index}`}
                  name="description"
                  value={proj.description || ''}
                  onChange={(e) => handleChange(e, 'projects', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="text"
                  id={`year-${index}`}
                  name="year"
                  value={proj.year || ''}
                  onChange={(e) => handleChange(e, 'projects', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeField('projects', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addField('projects')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Project
            </button>
          </div>
        </fieldset>

        {/* Skills */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Skills</legend>
          <div className="space-y-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  name="skill"
                  value={skill || ''}
                  onChange={(e) => {
                    const updatedSkills = [...formData.skills];
                    updatedSkills[index] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      skills: updatedSkills,
                    }));
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField('skills', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setFormData((prevFormData) => ({
                  ...prevFormData,
                  skills: [...prevFormData.skills, ''],
                }))}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Skill
              </button>
            </div>
          </div>
        </fieldset>

         {/* software */}
         <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Softwares</legend>
          {formData.software.map((soft, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={soft.name || ''}
                  onChange={(e) => handleChange(e, 'software', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label htmlFor={`level-${index}`} className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <input
                  type="text"
                  id={`level-${index}`}
                  name="level"
                  value={soft.level || ''}
                  onChange={(e) => handleChange(e, 'software', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeField('software', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addField('software')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Software
            </button>
          </div>
        </fieldset>

         {/* languages */}
         <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Languages</legend>
          {formData.languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={lang.name || ''}
                  onChange={(e) => handleChange(e, 'languages', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <label htmlFor={`level-${index}`} className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <input
                  type="text"
                  id={`level-${index}`}
                  name="level"
                  value={lang.level || ''}
                  onChange={(e) => handleChange(e, 'languages', index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeField('languages', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => addField('languages')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Languages
            </button>
          </div>
        </fieldset>

        {/* Achievements */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Achievements</legend>
          <div className="space-y-2">
            {formData.achievements.map((ach, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  name="achievement"
                  value={ach || ''}
                  onChange={(e) => {
                    const updatedAchievements = [...formData.achievements];
                    updatedAchievements[index] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      achievements: updatedAchievements,
                    }));
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField('achievements', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setFormData((prevFormData) => ({
                  ...prevFormData,
                  achievements: [...prevFormData.achievements, ''],
                }))}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Achievement
              </button>
            </div>
          </div>
        </fieldset>

{/* certificates */}
<fieldset className="border border-gray-200 rounded p-4">
  <legend className="text-lg font-semibold mb-2">Certificates</legend>
  <div className="space-y-2">
    {formData.certifications.map((certification, index) => (
      <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="certificateName"
          placeholder="Certificate Name"
          value={certification.name || ''}
          onChange={(e) => {
            const updatedCert = [...formData.certifications];
            updatedCert[index].name = e.target.value;
            setFormData((prevFormData) => ({
              ...prevFormData,
              certifications: updatedCert,
            }));
          }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />

        <input
          type="text"
          name="certificateYear"
          placeholder="Year"
          value={certification.year || ''}
          onChange={(e) => {
            const updatedCert = [...formData.certifications];
            updatedCert[index].year = e.target.value;
            setFormData((prevFormData) => ({
              ...prevFormData,
              certifications: updatedCert,
            }));
          }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />

        {index > 0 && (
          <button
            type="button"
            onClick={() => removeField('certifications', index)}
            className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <div className="flex justify-start">
      <button
        type="button"
        onClick={() => setFormData((prevFormData) => ({
          ...prevFormData,
          certifications: [...prevFormData.certifications, { name: '', year: '' }],
        }))}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add Certificate
      </button>
    </div>
  </div>
</fieldset>


      
{/* interest */}
<fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">interests</legend>
          <div className="space-y-2">
            {formData.interests.map((interests, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  name="interests"
                  value={interests || ''}
                  onChange={(e) => {
                    const updatedInt = [...formData.interests];
                    updatedInt[index] = e.target.value;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      interests: updatedInt,
                    }));
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField('Interests', index)}
                    className="text-red-600 hover:text-red-700 focus:outline-none ml-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setFormData((prevFormData) => ({
                  ...prevFormData,
                  interests: [...prevFormData.interests, ''],
                }))}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add Interest
              </button>
            </div>
          </div>
        </fieldset>

        {/* Others */}
        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="text-lg font-semibold mb-2">Others</legend>
          <textarea
            id="others"
            name="others"
            value={formData.others}
            onChange={(e) => handleChange(e, 'others')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows="5"
          ></textarea>
        </fieldset>

        {/* Submit Button */}
        <div className="flex justify-end">
        
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Next
          </button>
         
        </div>
      </form>
      
    </div>
    </div>
  );
};

export default CreateResume;
