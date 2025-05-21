import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiGrid, FiList, FiHeart, FiShoppingCart } from 'react-icons/fi';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Load current user from local storage
  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, []);
  
  // Load favorites from local storage
  useEffect(() => {
    if (currentUser) {
      const savedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [currentUser]);

  const templates = [
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

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business', name: 'Business' },
    { id: 'creative', name: 'Creative' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'blog', name: 'Blog' }
  ];

  // Function to toggle favorite status of a template
  const toggleFavorite = (templateId) => {
    if (!currentUser) {
      // Redirect to login or show a message if user is not logged in
      alert('Please log in to add templates to your wishlist');
      return;
    }
    
    let newFavorites;
    if (favorites.includes(templateId)) {
      // Remove from favorites if already in the list
      newFavorites = favorites.filter(id => id !== templateId);
    } else {
      // Add to favorites if not in the list
      newFavorites = [...favorites, templateId];
    }
    
    // Update state
    setFavorites(newFavorites);
    
    // Save to local storage
    localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(newFavorites));
  };
  
  // Check if a template is in favorites
  const isFavorite = (templateId) => {
    return favorites.includes(templateId);
  };
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Website Templates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose from our collection of professional website templates. 
              Each template is fully customizable and ready for your business.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96 relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
                {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
           
           </div>

          
          </div>

          {/* Templates Grid */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {filteredTemplates.map(template => (
              <div key={template.id} className={`bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className="relative">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className="bg-white dark:bg-dark-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    >
                      {isFavorite(template.id) ? (
                        <FiHeart className="text-red-500 w-5 h-5" fill="currentColor" />
                      ) : (
                        <FiHeart className="text-gray-400 dark:text-gray-300 w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{template.title}</h3>
                    <span className="font-bold text-primary-600 dark:text-primary-400">{template.price}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{template.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{template.downloads || 0} downloads</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        // Check if user is logged in
                        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        if (!currentUser) {
                          alert('Please sign in to purchase templates');
                          navigate('/signin');
                          return;
                        }
                        
                        // Navigate to payment page with template data
                        navigate('/payment', { state: { template } });
                      }}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center"
                    >
                      <FiShoppingCart className="mr-2" />
                      Buy Now
                    </button>
                    
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center"
                    >
                      {isFavorite(template.id) ? (
                        <>
                          <FiHeart className="mr-2 text-red-500" fill="currentColor" />
                          Saved
                        </>
                      ) : (
                        <>
                          <FiHeart className="mr-2" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;