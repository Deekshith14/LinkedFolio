import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '../../../public/lovable-uploads/LF.jpg'; // You can replace with a hosted URL if needed

const PublicNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo and Branding */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="LinkedFolio Logo" width={40} height={40} className="h-10 w-auto" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            LinkedFolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
            Home
          </Link>
          <Link to="/features" className={`text-sm font-medium transition-colors ${isActive('/features') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
            Features
          </Link>
          <Link to="/pricing" className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
            Pricing
          </Link>
          <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
            About
          </Link>
          <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {['/', '/features', '/pricing', '/about', '/contact'].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={toggleMenu}
                className={`block text-sm font-medium ${isActive(path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md text-center"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block text-sm font-medium text-gray-700 hover:text-blue-600 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="block text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md text-center mt-2"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
