
import React from 'react';
import { Link } from 'react-router-dom';
import { FileX } from 'lucide-react';

const NotFoundPortfolio: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md px-6">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FileX className="w-16 h-16 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Portfolio Not Found</h1>
        <p className="text-gray-600 mb-8">
          The portfolio you're looking for doesn't exist or has been removed.
        </p>
        <div className="space-y-3">
          <Link 
            to="/"
            className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Return Home
          </Link>
          <Link 
            to="/templates"
            className="block w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Create Your Own Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPortfolio;
