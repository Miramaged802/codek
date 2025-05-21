import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiHeart, FiShoppingCart, FiCamera, FiEdit2, FiSettings, FiLogOut, FiUser, FiGrid, FiGlobe, FiCreditCard, FiBarChart2, FiShield, FiBookmark } from 'react-icons/fi';
import { FaRegBell } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '',
    bio: 'Web Developer with experience in building responsive and user-friendly websites.',
    avatar: '',
    role: 'Premium Member',
    subscription: 'Premium Plan',
    subscriptionRenewal: '2025-08-21',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS']
  });
  
  const [favorites, setFavorites] = useState([]);
  const [favoriteTemplates, setFavoriteTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your subscription will renew in 30 days', read: false, date: '2025-05-20' },
    { id: 2, message: 'New template recommendations available', read: true, date: '2025-05-18' },
    { id: 3, message: 'Your website has been published successfully', read: true, date: '2025-05-15' }
  ]);
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);
  
  // Template data (normally this would come from an API)
  const allTemplates = [
    {
      id: 1,
      title: 'Business Portfolio',
      category: 'business',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      description: 'Professional business portfolio template with modern design',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Creative Agency',
      category: 'creative',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      description: 'Dynamic template for creative agencies and studios',
      price: '$49'
    },
    {
      id: 3,
      title: 'E-commerce Store',
      category: 'ecommerce',
      image: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg',
      description: 'Complete e-commerce solution with shopping cart',
      price: '$99'
    },
    {
      id: 4,
      title: 'Personal Blog',
      category: 'blog',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      description: 'Clean and minimal blog template',
      price: 'Free'
    },
    {
      id: 5,
      title: 'Restaurant Website',
      category: 'business',
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
      description: 'Perfect template for restaurants and cafes',
      price: '$49'
    },
    {
      id: 6,
      title: 'Photography Portfolio',
      category: 'creative',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      description: 'Showcase your photography work',
      price: '$49'
    }
  ];

  // Check if user is logged in and redirect if not
  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) {
      // Redirect to login page if not logged in
      navigate('/signin');
      return;
    }
    
    // Parse user data from localStorage
    const currentUser = JSON.parse(currentUserJson);
    
    // Format the join date
    const joinDate = new Date(currentUser.loginTime || currentUser.createdAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(joinDate);
    
    // Update user state with data from localStorage
    setUser(prevUser => ({
      ...prevUser,
      name: currentUser.name,
      email: currentUser.email,
      joinDate: formattedDate,
      // Generate avatar from name initials if no avatar exists
      avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=0D8ABC&color=fff&size=256`
    }));
    
    // Initialize edited user state
    setEditedUser({
      name: currentUser.name,
      email: currentUser.email,
      phone: prevUser => prevUser.phone,
      location: prevUser => prevUser.location,
      bio: prevUser => prevUser.bio
    });
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
      
      // Filter templates to get only favorites
      const userFavoriteTemplates = allTemplates.filter(template => 
        favoriteIds.includes(template.id)
      );
      setFavoriteTemplates(userFavoriteTemplates);
    }
    
    // Load purchased templates from localStorage
    const purchasedTemplatesJson = localStorage.getItem(`purchased_${currentUser.id}`);
    if (purchasedTemplatesJson) {
      const purchased = JSON.parse(purchasedTemplatesJson);
      setPurchasedTemplates(purchased);
    }
  }, [navigate]);

  // Handle profile editing
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio
    });
  };

  const handleSaveProfile = () => {
    // Update user state with edited values
    setUser(prevUser => ({
      ...prevUser,
      ...editedUser
    }));
    
    // Save to localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      const updatedUser = {
        ...currentUser,
        name: editedUser.name,
        email: editedUser.email
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification marking as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: 'Personal Portfolio',
      url: 'www.johndoe-portfolio.com',
      template: 'Portfolio Pro',
      status: 'Published',
      lastUpdated: '2 days ago',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      id: 2,
      name: 'Tech Blog',
      url: 'www.tech-insights.com',
      template: 'Blog Standard',
      status: 'Draft',
      lastUpdated: '1 week ago',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <div className="h-32 sm:h-48 bg-gradient-to-r from-primary-500 to-primary-700"></div>
            <div className="absolute top-16 sm:top-24 left-1/2 transform -translate-x-1/2 sm:left-8 sm:transform-none">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-dark-800 object-cover shadow-lg"
                />
                {!isEditing && (
                  <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white dark:bg-dark-800 p-1.5 sm:p-2 rounded-full shadow-lg text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <FiCamera className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Top right actions */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <button className="bg-white/20 hover:bg-white/30 p-1.5 sm:p-2 rounded-full text-white transition-colors">
                  <FaRegBell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full text-[10px] sm:text-xs">{unreadNotificationsCount}</span>
                  )}
                </button>
              </div>
              <button className="bg-white/20 hover:bg-white/30 p-1.5 sm:p-2 rounded-full text-white transition-colors">
                <FiSettings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          <div className="pb-6 px-4 sm:px-8">
            {!isEditing ? (
              <div className="px-4 sm:px-8 py-6 mt-16 sm:mt-0 sm:ml-40 sm:pt-0">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 text-center sm:text-left">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member since {user.joinDate}</p>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 text-white text-sm sm:text-base rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FiEdit2 className="mr-1 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 px-4 sm:px-0 mt-16 sm:mt-0 sm:ml-40">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base rounded-lg shadow transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-0">
              <div className="flex items-center p-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">{user.email}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">{user.phone}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">{user.location}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">Member since {user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <FiGrid className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span>Overview</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('websites')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === 'websites'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <FiGlobe className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span>Websites</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === 'favorites'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center relative">
                  <FiHeart className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span>Favorites</span>
                  {favoriteTemplates.length > 0 && (
                    <span className="absolute -top-1 -right-1 sm:static sm:ml-2 bg-gray-100 text-gray-700 dark:bg-dark-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full text-xs">{favoriteTemplates.length}</span>
                  )}
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === 'billing'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <FiCreditCard className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span>Billing</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <FiSettings className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" />
                  <span>Settings</span>
                </div>
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Websites</h3>
                      <span className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                        <FiGlobe className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{websites.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {websites.filter(w => w.status === 'Published').length} published
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Templates</h3>
                      <span className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
                        <FiBookmark className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{purchasedTemplates.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {favoriteTemplates.length} in wishlist
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription</h3>
                      <span className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
                        <FiCreditCard className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{user.subscription}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Renews on {new Date(user.subscriptionRenewal).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</h3>
                      <span className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg">
                        <FaRegBell className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {unreadNotificationsCount} unread
                    </p>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 ${notification.read ? 'bg-white dark:bg-dark-700' : 'bg-blue-50 dark:bg-blue-900/10'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <FaRegBell className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.date}</p>
                            </div>
                            {!notification.read && (
                              <span className="ml-3 flex-shrink-0 h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h2 className="text-xl font-bold mb-3 sm:mb-4 text-center sm:text-left">Skills</h2>
                  <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {user.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Websites Tab */}
            {activeTab === 'websites' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl font-bold">My Websites</h2>
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base rounded-lg shadow transition-colors flex items-center justify-center">
                    <FiGlobe className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Create New Website
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {websites.map(website => (
                    <div key={website.id} className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-32 sm:h-40 overflow-hidden">
                        <img
                          src={website.thumbnail}
                          alt={website.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                            website.status === 'Published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {website.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-5">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">{website.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 truncate">{website.url}</p>
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 flex-wrap">
                          <span className="truncate">Template: {website.template}</span>
                          <span className="mx-1 sm:mx-2 hidden sm:inline">•</span>
                          <span className="truncate">Updated {website.lastUpdated}</span>
                        </div>
                        
                        <div className="flex space-x-2 sm:space-x-3">
                          <button className="flex-1 px-2 sm:px-4 py-1 sm:py-2 bg-white dark:bg-dark-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-dark-500 transition-colors">
                            Edit
                          </button>
                          <button className="flex-1 px-2 sm:px-4 py-1 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm rounded-lg shadow transition-colors">
                            View Site
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Website Card */}
                  <div className="bg-gray-50 dark:bg-dark-700/50 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden flex items-center justify-center h-[200px] sm:h-[302px] hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors cursor-pointer">
                    <div className="text-center p-4 sm:p-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FiGlobe className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Create a New Website</h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Start building your next project with our templates</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Favorites</h2>
                  <Link to="/templates" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow transition-colors flex items-center">
                    <FiBookmark className="w-4 h-4 mr-2" />
                    Browse Templates
                  </Link>
                </div>
                
                {favoriteTemplates.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiHeart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Favorites Yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Save your favorite templates for quick access</p>
                    <Link to="/templates" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow transition-colors inline-flex items-center">
                      Browse Templates
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {favoriteTemplates.map(template => (
                      <div key={template.id} className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="relative">
                          <img
                            src={template.image}
                            alt={template.title}
                            className="w-full h-36 sm:h-48 object-cover"
                          />
                          <button 
                            onClick={() => {
                              // Remove from favorites
                              const newFavorites = favorites.filter(id => id !== template.id);
                              setFavorites(newFavorites);
                              setFavoriteTemplates(favoriteTemplates.filter(t => t.id !== template.id));
                              
                              // Save to localStorage
                              const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                              if (currentUser) {
                                localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(newFavorites));
                              }
                            }}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-white/80 hover:bg-white dark:bg-dark-800/80 dark:hover:bg-dark-800 rounded-full text-red-500 hover:text-red-600 transition-colors"
                          >
                            <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                          </button>
                          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/80 dark:bg-dark-800/80 rounded text-xs font-medium text-gray-800 dark:text-gray-200">
                              {template.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-3 sm:p-5 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-1 sm:mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                            <span className="text-sm sm:text-base font-bold text-primary-600 dark:text-primary-400">{template.price}</span>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2 flex-grow">{template.description}</p>
                          
                          <button 
                            onClick={() => {
                              // Navigate to payment page with template data
                              navigate('/payment', { state: { template } });
                            }}
                            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg shadow transition-colors flex items-center justify-center"
                          >
                            <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Purchase Template
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Billing & Plans Tab */}
            {activeTab === 'billing' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                  <h2 className="text-xl font-bold">Billing & Plans</h2>
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base rounded-lg shadow transition-colors flex items-center justify-center">
                    <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Manage Payment Methods
                  </button>
                </div>
                
                {/* Current Plan */}
                <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
                  <div className="bg-primary-50 dark:bg-primary-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{user.subscription}</h4>
                          <span className="mt-1 sm:mt-0 sm:ml-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium rounded-full self-center sm:self-auto">Active</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Your plan renews on {new Date(user.subscriptionRenewal).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:space-x-3">
                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors">
                          Cancel Plan
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base rounded-lg shadow transition-colors">
                          Upgrade Plan
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-4">Your Plan Includes:</h5>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Unlimited website projects</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Access to all premium templates</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Custom domain support</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Billing History */}
                <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h3>
                  </div>
                  
                  <div className="overflow-x-auto hide-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-dark-800">
                        <tr>
                          <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-dark-700 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">May 21, 2025</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">Premium Plan</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">$29.99</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-primary-600 dark:text-primary-400 hover:underline">Download</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">Apr 21, 2025</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">Premium Plan</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">$29.99</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-primary-600 dark:text-primary-400 hover:underline">Download</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">Mar 21, 2025</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">Premium Plan</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">$29.99</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-primary-600 dark:text-primary-400 hover:underline">Download</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl font-bold">Account Settings</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                  {/* Account Settings */}
                  <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
                      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <label htmlFor="settings-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input
                              type="text"
                              id="settings-name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                              defaultValue={user.name}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input
                              type="email"
                              id="settings-email"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                              defaultValue={user.email}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="settings-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                            <input
                              type="tel"
                              id="settings-phone"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                              defaultValue={user.phone}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="settings-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <input
                              type="text"
                              id="settings-location"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                              defaultValue={user.location}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="settings-bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                          <textarea
                            id="settings-bio"
                            rows="3"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white text-sm sm:text-base py-1.5 sm:py-2"
                            defaultValue={user.bio}
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-center sm:justify-end">
                          <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base rounded-lg shadow transition-colors">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Password & Security</h3>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                            <input
                              type="password"
                              id="current-password"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white"
                              placeholder="••••••••"
                            />
                          </div>
                          
                          <div className="md:pt-7">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your current password to change your password</p>
                          </div>
                          
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                            <input
                              type="password"
                              id="new-password"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white"
                              placeholder="••••••••"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                            <input
                              type="password"
                              id="confirm-password"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:border-dark-500 dark:text-white"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    {/* Notification Settings */}
                    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
                      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive emails about account activity</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="email-notifications" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="email-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive emails about new features and offers</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="marketing-emails" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="marketing-emails" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Website Notifications</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Show notifications in the dashboard</p>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" id="website-notifications" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="website-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Danger Zone */}
                    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                      <div className="px-6 py-4 border-b border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center">
                          <FiShield className="w-5 h-5 mr-2" />
                          Danger Zone
                        </h3>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Delete Account</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button className="px-4 py-2 bg-white dark:bg-dark-600 border border-red-500 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;