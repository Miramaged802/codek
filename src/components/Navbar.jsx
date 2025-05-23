import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHome, FiGrid, FiPackage, FiInfo, FiMoon, FiSun, FiLogOut, FiSettings, FiCode } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // Check if user is logged in
  const checkUserLoggedIn = () => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // Check on initial load
    checkUserLoggedIn();
    
    // Set up event listeners for auth state changes
    window.addEventListener('storage', checkUserLoggedIn);
    window.addEventListener('auth-state-change', checkUserLoggedIn);
    
    // Force a check when route changes (helpful after signin/signup)
    checkUserLoggedIn();

    return () => {
      window.removeEventListener('storage', checkUserLoggedIn);
      window.removeEventListener('auth-state-change', checkUserLoggedIn);
    };
  }, [location.pathname]); // Re-check when route changes
  
  // Close sidebar and dropdown when clicking outside or pressing escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
      
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.closest('.user-menu-button')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsDropdownOpen(false);
    
    // Redirect to home page
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className=" border-b border-gray-200 dark:border-dark-400">
      <div className="container px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="img/light.png" 
            alt="Codek Logo" 
           
            style={{width: '150px' , height: '50px'}}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium ${isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`text-sm font-medium ${isActive('/templates') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Templates
          </Link>
          <Link 
            to="/plans" 
            className={`text-sm font-medium ${isActive('/plans') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Plans
          </Link>
          <Link 
            to="/packages" 
            className={`text-sm font-medium ${isActive('/packages') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Packages
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium ${isActive('/about') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium ${isActive('/contact') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Contact Us
          </Link>
        </div>
        
        {/* Sign In/Sign Up & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 user-menu-button"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden lg:block">{currentUser.name.split(' ')[0]}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-700 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-dark-600">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-600">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600 flex items-center"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600 flex items-center"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 menu-button"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 sidebar`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400" onClick={closeMenu}>
              Codak
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-1 flex-grow">
            <Link 
              to="/" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiHome className="mr-3 w-5 h-5" />
              Home
            </Link>
            <Link 
              to="/templates" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/templates') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiGrid className="mr-3 w-5 h-5" />
              Templates
            </Link>
            <Link 
              to="/plans" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/plans') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiPackage className="mr-3 w-5 h-5" />
              Plans
            </Link>
            <Link 
              to="/packages" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/packages') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiCode className="mr-3 w-5 h-5" />
              Packages
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/about') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiInfo className="mr-3 w-5 h-5" />
              About
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center px-4 py-3 rounded-md ${isActive('/contact') ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              <FiInfo className="mr-3 w-5 h-5" />
              Contact Us
            </Link>
          </div>
          
          <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            </div>
            
            {currentUser ? (
              <>
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <FiUser className="mr-3 w-5 h-5" />
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <FiSettings className="mr-3 w-5 h-5" />
                  Settings
                </Link>
                <button 
                  className="flex items-center w-full text-left px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  <FiLogOut className="mr-3 w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="block px-4 py-2 text-center rounded-md border border-gray-300 dark:border-gray-600 font-medium"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-4 py-2 text-center rounded-md bg-primary-900 text-white font-medium"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;