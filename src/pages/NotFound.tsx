import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#2F80ED]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-[#2F80ED]">404</span>
        </div>
        <h1 className="text-3xl font-bold text-[#333333] mb-4">Page Not Found</h1>
        <p className="text-[#828282] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-[#2F80ED] text-white px-6 py-3 rounded-lg hover:bg-[#1A2A4F] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;