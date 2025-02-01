// components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  
  const menuItems = [
    { id: 'contacts', path: '/contacts', label: 'Contact Queries', icon: 'Phone' },
    { id: 'food', path: '/food', label: 'Food Brands', icon: 'Pizza' },
    { id: 'clothing', path: '/clothing', label: 'Clothing Brands', icon: 'ShoppingBag' },
  ];

  return (
    <div className={`fixed mt-[2px] left-0 h-full bg-white shadow-xl transition-all duration-300 
      ${isOpen ? 'w-64' : 'w-20'} z-10`}>
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <LucideIcons.ChevronLeft 
            className={`transform transition-transform ${!isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = LucideIcons[item.icon];
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center p-3 mb-2 rounded-lg transition-colors
                ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
              `}
            >
              <Icon size={20} />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;