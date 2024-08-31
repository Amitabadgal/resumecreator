import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainContent from './components/MainContent';
import Footer from './components/Footer';
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Loginpage';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import TemplateSelector from './pages/TemplateSelector';
import ResumeGenerator1 from './pages/ResumeGenerator1';
import ResumeGenerator2 from './pages/ResumeGenerator2';
import ResumeGenerator3 from './pages/ResumeGenerator3';
import ResumeGenerator4 from './pages/ResumeGenerator4';
import ResumeGenerator5 from './pages/ResumeGenerator5';
import Download from './pages/download';
import Viewresume from './pages/viewresume';

const App = () => {
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="homepage">
      

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/download" element={<Download />} />
        <Route path="/viewresume" element={<Viewresume/>} />

        <Route
          path="/template-selector"
          element={
            <TemplateSelector onSelectTemplate={handleTemplateSelection} />
          }
        />

<Route
          path="/resume-generator1"
          element={
            selectedTemplate && userId ? (
              <ResumeGenerator1 selectedTemplate={selectedTemplate} userId={userId} />
            ) : (
              <Navigate to="/template-selector" />
            )
          }
        />
        <Route
          path="/resume-generator2"
          element={
            selectedTemplate && userId ? (
              <ResumeGenerator2 selectedTemplate={selectedTemplate} userId={userId} />
            ) : (
              <Navigate to="/template-selector" />
            )
          }
        />
        <Route
          path="/resume-generator3"
          element={
            selectedTemplate && userId ? (
              <ResumeGenerator3 selectedTemplate={selectedTemplate} userId={userId} />
            ) : (
              <Navigate to="/template-selector" />
            )
          }
        />
        <Route
          path="/resume-generator4"
          element={
            selectedTemplate && userId ? (
              <ResumeGenerator4 selectedTemplate={selectedTemplate} userId={userId} />
            ) : (
              <Navigate to="/template-selector" />
            )
          }
        />
        <Route
        path="/resume-generator5"
        element={
          selectedTemplate && userId ? (
            <ResumeGenerator5 selectedTemplate={selectedTemplate} userId={userId} />
          ) : (
            <Navigate to="/template-selector" />
          )
        }
      />

      </Routes>

      <Footer />
    </div>
  );
};

export default App;
