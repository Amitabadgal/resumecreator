import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import RegistrationForm from './components/RegistrationForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
