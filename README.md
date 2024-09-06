# Resume Creator

A full-stack web application that allows users to create, edit, and manage their resumes online. This application features user authentication, a responsive design, the ability to download and save resumes on a dashboard, and the option to choose different templates for resumes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Upcoming Features](#upcoming-features)

## Features

- **User Authentication**: Register and log in to your account securely.
- **Resume Management**: Create, edit, and delete resumes.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Download Resumes**: Download resumes in PDF format.
- **User Dashboard**: View and manage all created resumes.

## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - Axios for API calls
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for database management
  - JSON Web Tokens (JWT) for authentication
- **Deployment**: 
  - Render for hosting the backend and frontend

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Amitabadgal/resumecreator.git
2. Navigate to the project directory:
   cd resumecreator
3. Install backend dependencies:
   cd backend
   npm install
4. Install frontend dependencies:
  cd frontend
  npm install
5. Set up environment variables:
  
  Create a .env file in the backend directory and add the necessary environment variables for MongoDB connection and JWT secret. Example:
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ## Usage
  Start the backend server:
  cd backend
  npm start
  Start the frontend server:
  cd frontend
  npm start
  Open your browser and navigate to http://localhost:3000 to access the application.

## API Endpoints
Authentication
POST /api/auth/register: Register a new user
POST /api/auth/login: Login an existing user
Resume Management
GET /api/resumes: Retrieve all resumes for the authenticated user
POST /api/resumes: Create a new resume
PUT /api/resumes/:id: Update an existing resume
DELETE /api/resumes/:id: Delete a resume

## Deployment
The application is deployed on Render:
Frontend: https://resumecreator-frontend.onrender.com
Backend: https://resumecreator-u9et.onrender.com

## Contributing
Contributions are welcome! To contribute, please follow these steps:
Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add your feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
## License
This project is licensed under the MIT License. See the LICENSE file for details.


### Instructions
- Update any specific information if necessary, such as environment variables or additional features.
- Save this content into a file named `README.md` in the root directory of your repository.
- Consider adding images or screenshots to illustrate the application’s features or interface.

## Upcoming Features
Enhanced Template Selection: Introduce a wider variety of professionally designed resume templates for users to choose from.
Real-time Collaboration: Enable multiple users to collaborate on a resume in real time.
Application Tracking: Implement a feature for users to track job applications directly from the dashboard.
Analytics Dashboard: Add analytics to help users track resume views and engagement metrics.

