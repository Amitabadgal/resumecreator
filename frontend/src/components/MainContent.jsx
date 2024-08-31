import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from './logo1.png';
import backgroundImage from './bg.jpg';
import Header from './Header';

const appStyle = {
    position: 'fixed', // Fixed position to keep the container in place
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden', // Prevent scrolling
};

const backgroundOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    zIndex: 1,
};

const contentStyle = {
    position: 'fixed', // Keep the content fixed in the center
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '20px',
    color: '#fff',
};

const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#2697d1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Open Sans, sans-serif',
};

const flexStyle1 = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '40vh',
    marginRight: '80px',
    marginTop: '-400px',
};

const nameStyle = {
    fontWeight: '700',
    fontSize: '4rem',
    fontFamily: 'Bebas Neue, sans-serif',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #c116e3 20%, #ff3ad9 20%, #17d0ef 80%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
};



const MainContent = () => {
    const navigate = useNavigate();

    const navigateToRegistration = () => {
        navigate('/registration');
    };

    const navigateToLogin = () => {
        navigate('/Login');
    };

    return (
        <div style={appStyle}>
            <Header />
            <div style={backgroundOverlayStyle}></div>
            <div style={contentStyle}>
                <div>
                    <img
                        src={logo1}
                        alt='logo'
                        style={{ width: '200px', height: '200px', marginLeft: '100px', marginTop: '0px' }}
                    />
                    <h1 style={nameStyle}>Resume Creator</h1>
                </div>
                <div style={flexStyle1}>
                    <div>
                        <button onClick={navigateToRegistration} style={buttonStyle}>
                            Registration
                        </button>
                    </div>
                    <div>
                        <button onClick={navigateToLogin} style={buttonStyle}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
