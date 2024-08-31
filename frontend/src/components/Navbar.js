// Navbar.js
import { Link } from 'react-router-dom';

const buttonStyle = {
  backgroundColor: '#2563EB',
  color: 'white',
  padding: '1rem',
  borderRadius: '0.375rem',
  transition: 'background-color 0.2s',
  fontSize: '1.2rem',
  margin: '10px',
};

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-600 p-4 text-white fixed w-full z-10">
      <div className="flex space-x-4">
        <button style={buttonStyle} onClick={() => {/* Add your toggle function here */}}>
          Edit Details
        </button>
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>Add Details</button>
        </Link>
        <Link to="/template-selector" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>Select Template</button>
        </Link>
        <Link to="/viewresume" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>View Resumes</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
