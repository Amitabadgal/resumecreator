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
        
      </div>
    </div>
  );
};

export default Header;
