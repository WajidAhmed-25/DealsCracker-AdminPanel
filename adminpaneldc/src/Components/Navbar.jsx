// components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove('dealscrackerAdmin-token');
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or brand name can go here */}
          <div className="border-2 border-[#267fa2da] rounded-full flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="Your Brand Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="relative">
                  <img
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
                <LucideIcons.ChevronDown 
                  className={`h-5 w-5 text-gray-600 transition-transform duration-200 
                    ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-sm text-gray-500">Admin@yopmail.com</p>
                </div>
                
                {/* Dropdown items */}
                <button
                  onClick={() => handleLogout()}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LucideIcons.LogOut className="mr-3 h-4 w-4 text-gray-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;