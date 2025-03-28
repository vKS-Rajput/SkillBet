import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGamepad, FaCode, FaChartLine, FaBell, FaCoins, FaUserAlt, FaTimes } from 'react-icons/fa';
import { FaSpaghettiMonsterFlying } from 'react-icons/fa6';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('coding');

  const sections = [
    { name: 'Coding', icon: <FaCode />, path: '/dashboard/coding' },
    { name: 'Gaming', icon: <FaGamepad />, path: '/dashboard/gaming' },
    { name: 'Trading', icon: <FaChartLine />, path: '/dashboard/trading' },
    { name: 'Statistics', icon: <FaSpaghettiMonsterFlying />, path: '/dashboard/stats' }
  ];

  const handleSectionClick = (sectionName, path) => {
    setActiveSection(sectionName.toLowerCase());
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navigateToHome = () => {
    navigate('/dashboard');
    setActiveSection('coding');
  };

  return (
    <>
      <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between border-b border-purple-500 sticky top-0 z-50">
        {/* Left section - Logo and mobile menu button */}
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden text-purple-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaGamepad size={22} />}
          </button>
          
          <div 
            className="flex items-center cursor-pointer"
            onClick={navigateToHome}
          >
            <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
              <FaCode size={18} />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hidden sm:block">
              CodePlay
            </span>
          </div>
        </div>

        {/* Middle section - Navigation tabs */}
        <div className="hidden md:flex items-center space-x-1 bg-gray-800 rounded-full px-1 py-1 mx-4">
          {sections.map((section) => (
            <button
              key={section.name}
              className={`px-4 py-1 rounded-full flex items-center space-x-2 text-sm ${
                activeSection === section.name.toLowerCase() 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleSectionClick(section.name, section.path)}
            >
              <span className="text-xs">{section.icon}</span>
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Right section - Icons and profile */}
        <div className="flex items-center space-x-4">
          {/* Mobile notification and profile */}
          <button 
            className="md:hidden relative"
            onClick={() => navigate('/dashboard/notifications')}
          >
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
              3
            </span>
          </button>
          
          <div 
            className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center md:hidden cursor-pointer"
            onClick={() => navigate('/dashboard/profile')}
          >
            <FaUserAlt size={14} />
          </div>

          {/* Desktop items */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              className="relative group flex items-center"
              onClick={() => navigate('/dashboard/wallet')}
            >
              <FaCoins className="text-yellow-400" size={18} />
              <span className="ml-1 text-sm font-mono">1,250</span>
            </button>
            
            <button 
              className="relative"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                3
              </span>
            </button>
          </div>

          <div 
            className="hidden md:flex items-center space-x-3 bg-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-700"
            onClick={() => navigate('/dashboard/profile')}
          >
            <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center">
              <FaUserAlt size={14} />
            </div>
            <div>
              <p className="text-sm font-medium">CyberCoder</p>
              <p className="text-xs text-purple-300">Level 42</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu with sections */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-purple-500/50 pb-4 px-4">
          {/* Mobile sections */}
          <div className="py-2 space-y-1">
            {sections.map((section) => (
              <button
                key={`mobile-${section.name}`}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-left ${
                  activeSection === section.name.toLowerCase()
                    ? 'bg-purple-600/30 text-white border-l-4 border-purple-400'
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => handleSectionClick(section.name, section.path)}
              >
                <span className="text-purple-400">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
          
          {/* Mobile additional navigation */}
          <div className="py-2 space-y-1">
            <button
              className="w-full flex items-center space-x-3 px-3 py-3 rounded text-left hover:bg-gray-700"
              onClick={() => {
                navigate('/dashboard/wallet');
                setMobileMenuOpen(false);
              }}
            >
              <FaCoins className="text-yellow-400" />
              <span>Wallet</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 px-3 py-3 rounded text-left hover:bg-gray-700"
              onClick={() => {
                navigate('/dashboard/notifications');
                setMobileMenuOpen(false);
              }}
            >
              <FaBell className="text-red-400" />
              <span>Notifications</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 px-3 py-3 rounded text-left hover:bg-gray-700"
              onClick={() => {
                navigate('/dashboard/profile');
                setMobileMenuOpen(false);
              }}
            >
              <FaUserAlt className="text-purple-400" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;