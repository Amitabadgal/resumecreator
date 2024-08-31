import React, { useState } from 'react';

const WorkExperienceForm = ({ onNext }) => {
  const [experience, setExperience] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(experience);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          value={experience.company}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={experience.role}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={experience.startDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={experience.endDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={experience.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
