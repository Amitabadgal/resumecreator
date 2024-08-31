import React from 'react';
import { useNavigate } from 'react-router-dom';
import template1 from './template1.png';
import template2 from './temp2.png';
import template3 from './temp3.jpg';
import template4 from './temp4.png';
import template5 from './temp5.jpg';
import Header1 from '../components/header1';

const templates = [
  { id: 1, name: 'Template 1', image: template1 },
  { id: 2, name: 'Template 2', image: template2 },
  { id: 3, name: 'Template 3', image: template3 },
  { id: 4, name: 'Template 4', image: template4 },
  { id: 5, name: 'Template 5', image: template5 },
  // Add more templates as needed
];

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

const contentStyle = {
  paddingTop: '80px', // Adjust padding to accommodate the fixed header
  paddingLeft: '20px',
  paddingRight: '20px',
};

const TemplateSelector = ({ onSelectTemplate }) => {
  const navigate = useNavigate();

  const handleSelect = (template) => {
    onSelectTemplate(template);
    switch (template.id) {
      case 1:
        navigate('/resume-generator1');
        break;
      case 2:
        navigate('/resume-generator2');
        break;
        case 3:
        navigate('/resume-generator3');
        break;
        case 4:
        navigate('/resume-generator4');
        break;
        case 5:
        navigate('/resume-generator5');
        break;
      // Add cases for other templates
      default:
        navigate('/resume-generator1');
    }
  };

  return (
    <div style={appStyle}>
    <Header1 style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
    <div style={contentStyle}>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 " style={{color: '#0e6fa0'}}>Choose a Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => handleSelect(template)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-xl font-bold">{template.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default TemplateSelector;
