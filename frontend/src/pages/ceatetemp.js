import React from 'react';
import { Link } from 'react-router-dom';
import Template1 from './Template1';

const CreateTemp = () => (
  <div>
    <Template1 />
    <div className="flex justify-center"> 
      <div className="p-6 text-center bg-gray-200">
        <Link to="/layout">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Back to Templates
          </button>
        </Link>
      </div>
      <div className="p-6 text-center bg-gray-200">
        <Link to="/downloadpdf">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Download Resume
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default CreateTemp;
