
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Linked</span>
              <span className="text-2xl font-bold text-secondary">Folio</span>
            </Link>
            <p className="mt-4 text-body">
              Build and showcase your professional portfolio with ease.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="heading-sm mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-body hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-body hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Showcase
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="heading-sm mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-body hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-body hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="heading-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-small">
            © {currentYear} LinkedFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
