import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Menu, X } from 'lucide-react'; // Import icons from Lucide React

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu toggle

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900/95 top-2 right-6 left-6 rounded-3xl fixed text-white z-50">
      <div className="container mx-auto px-1 py-3 flex justify-between items-center">
        {/* Logo and Icon */}
        <div className="flex items-center space-x-2">
          {/* Title (hidden on small screens) */}
          <Link to="/" className="text-xl font-bold hidden sm:block">
            ConstructionXpert
          </Link>
          {/* Icon (shown on small screens) */}
          <Link to="/" className=" sm:hidden">
            <HardHat className="w-6 h-6 text-white hover:text-teal-300" /> {/* Replace with your icon */}
          </Link>
        </div>

        {/* Navigation Links (visible on larger screens) */}
        <div className="hidden w-2/3 sm:flex gap-40 items-center">
          <Link
            to="/"
            className={`${location.pathname === '/' ? 'text-teal-400' : 'text-white'} hover:text-teal-300 `}
          >
            HOME
          </Link>
          <Link
            to="/projects"
            className={`${location.pathname === '/projects' ? 'text-teal-400' : 'text-white'} hover:text-teal-300 mr-auto uppercase`}
          >
            Projects
          </Link>
          {/* <button className="bg-white ml-auto text-gray-900 px-4 py-2 rounded hover:bg-teal-400 hover:text-white transition-colors">
            Conexion
          </button> */}
        </div>

        {/* Mobile Menu Button (visible on small screens) */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} {/* Toggle between Menu and Close icons */}
          </button>
        </div>
      </div>

      {/* Mobile Menu (visible on small screens when toggled) */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800/95 mt-2 rounded-lg p-4 shadow-lg">
          <div className="flex flex-col space-y-4 text-center">
            <Link
              to="/"
              className={`${location.pathname === '/' ? 'text-teal-400' : 'text-white'} hover:text-teal-300 `}
              onClick={toggleMenu} // Close menu when a link is clicked
            >
              HOME
            </Link>
            <Link
              to="/projects"
              className={`${location.pathname === '/projects' ? 'text-teal-400' : 'text-white'} hover:text-teal-300 uppercase`}
              onClick={toggleMenu} // Close menu when a link is clicked
            >
              Projects
            </Link>
            {/* <button
              className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-teal-400 hover:text-white transition-colors"
              onClick={toggleMenu} // Close menu when the button is clicked
            >
              Conexion
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;