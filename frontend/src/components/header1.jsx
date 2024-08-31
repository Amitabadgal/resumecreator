import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
const Header = () => {
  const headerStyle = {
    background: 'linear-gradient(to bottom right, #17d0ef, #2697d1)',
    padding: '10px 20px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    color: 'white',
    position: 'fixed', // Fixes the header at the top
    width: '100%',
    zIndex: 3, // Makes sure the header is above other content
  };
  const logoStyle = {
    fontSize: '1.15rem', // Increased font size for the logo
    color: '#ffffff', // Changed font color
    marginLeft: '2cm',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div id="header-wrapper" className="analyser-homepage" style={headerStyle}>
      <div id="header" className="container-template flex items-center justify-between space-x-10">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '50px', height: '50px', marginLeft:'30px' }}
          />
        </Link>
        <div className="flex space-x-8">
          <Link to="/dashboard" style={logoStyle}>
            Home
          </Link>
          <Link to="/template-selector" style={logoStyle}>
            Templates
          </Link>
          <Link to="/viewresume" style={logoStyle}>
            <div style={{marginRight:'10px'}}>View Resumes</div>   
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
