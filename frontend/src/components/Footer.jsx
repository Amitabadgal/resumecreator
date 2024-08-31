import React from 'react';
import fimage from './fimage.png';

const Footer = () => {
    const footerStyle = {
        background: 'linear-gradient(to bottom right, #17d0ef, #2697d1)', 
        marginLeft: '0cm',
        marginRight: '0cm',
        paddingTop: '10px', // Increased padding for larger header size    height: '3cm', // Adjusted height to accommodate increased padding
        color: 'black',
        
    };
    const logoStyle = {
        fontSize: '.75 rem', // Increased font size for the logo
       color: '#ffffff', // Changed font color
        marginRight: '1cm',
      };
  return (
    <div className="fixed bottom-0 w-full">
        <div id="footer" className="container-template flex justify-between " style={footerStyle}>
            <div>
            <img src={fimage} style={{ height: '30px', width: '25px', marginLeft: '20px', marginBottom: '5px' }}/>
            </div>
            <div>
                <h1 style={logoStyle}>
                ©Resume Craft 2024
                </h1>
            </div>
        </div>
      </div>
  );
};

export default Footer;
