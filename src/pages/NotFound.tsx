
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="heading-lg mt-4">Page Not Found</h2>
          <p className="text-lead mt-2 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
