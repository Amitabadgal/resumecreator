import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Template1 from './Template1';
import { Link } from 'react-router-dom';

const DownloadPDF = () => (
  <div className="flex justify-center space-x-4" >
    <div>
    <PDFDownloadLink document={<Template1 />} fileName="template.pdf">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
      Download PDF
      {({ loading }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
      </button>
    </PDFDownloadLink>
    </div>
   <div>
     <Link to="/Dashboard">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Back to Home
          </button>
        </Link>
        </div>
  </div>
);

export default DownloadPDF;
