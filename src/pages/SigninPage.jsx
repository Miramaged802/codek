import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Check if there's a success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    
    // Check for admin credentials
    const ADMIN_EMAIL = 'admin@codek.com';
    const ADMIN_PASSWORD = 'admin123';
    
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      // Store admin user in local storage
      const adminUser = {
        id: 'admin-1',
        name: 'Admin',
        email: ADMIN_EMAIL,
        isLoggedIn: true,
        isAdmin: true,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      
      // Simulate server delay
      setTimeout(() => {
        setIsSubmitting(false);
        // Notify about authentication state change
        window.dispatchEvent(new Event('auth-state-change'));
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      }, 1500);
      
      return;
    }
    
    // Regular user authentication
    // Get users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email
    const user = users.find(user => user.email === formData.email);
    
    // Check if user exists and password matches
    if (!user || user.password !== formData.password) {
      setTimeout(() => {
        setIsSubmitting(false);
        setLoginError('Invalid email or password');
      }, 1000);
      return;
    }
    
    // Store current user in local storage (without password for security)
    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Simulate server delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Notify about authentication state change
      window.dispatchEvent(new Event('auth-state-change'));
      // Redirect to home page
      navigate('/');
    }, 1500);
  };
  
  // Hide navbar and footer when this component mounts
  useEffect(() => {
    // Hide navbar and footer
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Trigger auth state change when user signs in
    const refreshAuthState = () => {
      window.dispatchEvent(new Event('auth-state-change'));
    };
    
    // Restore navbar and footer when component unmounts
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-900">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 relative">
        <img 
          src="img/signin.jpg" 
          alt="Team collaboration" 
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-dark-900">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Sign In</h1>
            <p className="text-gray-600 dark:text-gray-400">
              It is a long established fact that a reader will be distracted
            </p>
            {successMessage && (
              <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
            {loginError && (
              <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-md">
                {loginError}
              </div>
            )}
          </div>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pr-10 bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-900 hover:text-primary-800 dark:text-primary-400">
                  Forgot Your Password?
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full btn bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-medium transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-700 text-gray-500 dark:text-gray-400">Or sign in with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign In With Google
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SigninPage;