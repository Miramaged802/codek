import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  
  
  return (
    <footer className="bg-dark-500 text-white py-12 rounded-t-[50px]" >
      {/* Top border accent */}
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/img/mainlogo.png" alt="Codak" className="h-8 mr-2" />
              <span className="text-xl font-bold">Codak</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              World's #1 platform for building websites and managing content for your business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram />
              </a>
            </div>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>500 Terry A Francois Blvd</p>
              <p>San Francisco, CA 94158</p>
              <p className="mt-2">info@codak.com</p>
              <p>+1-800-123-4567</p>
            </address>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p> 2024 Codak. All rights reserved. #1</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;