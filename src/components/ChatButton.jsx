import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const ChatButton = () => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Show tooltip after a delay
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    
    // Hide tooltip after some time
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    
    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  
  const handleClick = () => {
    navigate('/chat');
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-dark-700 text-gray-800 dark:text-white p-3 rounded-lg shadow-lg max-w-xs mb-2 animate-fade-in">
          <button 
            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
          >
            <FiX size={16} />
          </button>
          <p className="pr-5">Need help? Chat with our AI assistant!</p>
        </div>
      )}
      <button 
        onClick={handleClick}
        className="bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open Chat"
      >
        <FiMessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatButton;
