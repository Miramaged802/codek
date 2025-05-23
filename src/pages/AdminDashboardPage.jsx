// src/components/AdminDashboardPage.jsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiPackage, FiGrid, FiSettings, FiLogOut, FiPlus, FiEdit, FiTrash, FiBell, FiSearch, FiMenu, FiX, FiCalendar, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data (move to a separate file or API in production)
const initialPackages = [
  { id: 1, name: 'Basic Website Package', price: 100, sales: 14 },
  { id: 2, name: 'Advanced Website Package', price: 300, sales: 8 },
  { id: 3, name: 'Ultimate Website Package', price: 1000, sales: 3 },
];

const initialTemplates = [
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

const initialPricing = {
  monthly: {
    basic: '$99',
    basicLabel: '/package',
    advanced: '$299',
    advancedLabel: '/package',
    ultimate: '$999',
    ultimateLabel: '/package'
  },
  yearly: {
    basic: '$89',
    basicLabel: '/package',
    basicSaving: 'Save $120/year',
    advanced: '$269',
    advancedLabel: '/package',
    advancedSaving: 'Save $360/year',
    ultimate: '$899',
    ultimateLabel: '/package',
    ultimateSaving: 'Save $1,200/year'
  }
};

const monthlyData = [
  { name: 'Jan', revenue: 2400, users: 5, templates: 2, packages: 3 },
  { name: 'Feb', revenue: 1398, users: 8, templates: 4, packages: 5 },
  { name: 'Mar', revenue: 9800, users: 12, templates: 7, packages: 8 },
  { name: 'Apr', revenue: 3908, users: 15, templates: 9, packages: 7 },
  { name: 'May', revenue: 4800, users: 21, templates: 12, packages: 10 },
  { name: 'Jun', revenue: 3800, users: 25, templates: 15, packages: 12 },
  { name: 'Jul', revenue: 4300, users: 28, templates: 17, packages: 13 },
];

const userActivity = [
  { date: 'Monday', active: 40 },
  { date: 'Tuesday', active: 30 },
  { date: 'Wednesday', active: 45 },
  { date: 'Thursday', active: 55 },
  { date: 'Friday', active: 48 },
  { date: 'Saturday', active: 35 },
  { date: 'Sunday', active: 28 },
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 'txn-001',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    date: '2025-05-22',
    amount: 100,
    status: 'completed',
    package: 'Basic Website Package'
  },
  {
    id: 'txn-002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2025-05-21',
    amount: 300,
    status: 'completed',
    package: 'Advanced Website Package'
  },
  {
    id: 'txn-003',
    customer: 'Michael Chen',
    email: 'mchen@example.com',
    date: '2025-05-21',
    amount: 1000,
    status: 'completed',
    package: 'Ultimate Website Package'
  },
  {
    id: 'txn-004',
    customer: 'Emma Wilson',
    email: 'ewilson@example.com',
    date: '2025-05-20',
    amount: 100,
    status: 'completed',
    package: 'Basic Website Package'
  },
  {
    id: 'txn-005',
    customer: 'David Lee',
    email: 'dlee@example.com',
    date: '2025-05-19',
    amount: 300,
    status: 'completed',
    package: 'Advanced Website Package'
  },
  {
    id: 'txn-006',
    customer: 'Lisa Brown',
    email: 'lbrown@example.com',
    date: '2025-05-18',
    amount: 100,
    status: 'completed',
    package: 'Basic Website Package'
  }
];

// Components
const StatsCard = ({ title, value, icon, trend, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl shadow-xl p-6 text-white relative overflow-hidden`}>
    <div className="absolute top-0 right-0 mt-4 mr-4 bg-white/20 rounded-full p-2">{icon}</div>
    <div className="text-white/80 mb-1 text-sm font-medium">{title}</div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className="flex items-center text-xs">
      <FiTrendingUp className="mr-1" />
      <span>{trend}</span>
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

const UsersTab = ({ users, setUsers }) => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!newUser.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!newUser.password || newUser.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddUser = () => {
    if (!validateForm()) return;

    const newUserObj = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUserObj];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('users-updated'));
    setNewUser({ name: '', email: '', password: '' });
    setIsAddUserOpen(false);
    setErrors({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h2>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Add new user"
        >
          <FiPlus className="mr-2" />
          Add User
        </button>
      </div>

      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{user.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-primary-600">{user.email}</p>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="p-2 text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                aria-label={`Edit user ${user.name}`}
              >
                <FiEdit />
              </button>
              <button
                className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-400"
                aria-label={`Delete user ${user.name}`}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PackagesTab = ({ packages, setPackages }) => {
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({ name: '', price: '', advantages: '', disadvantages: '' });
  const [errors, setErrors] = useState({ name: '', price: '', advantages: '', disadvantages: '' });

  const validateForm = () => {
    const newErrors = { name: '', price: '', advantages: '', disadvantages: '' };
    let isValid = true;

    if (!newPackage.name) {
      newErrors.name = 'Package name is required';
      isValid = false;
    }
    if (!newPackage.price || isNaN(newPackage.price) || Number(newPackage.price) <= 0) {
      newErrors.price = 'Valid price is required';
      isValid = false;
    }
    if (!newPackage.advantages) {
      newErrors.advantages = 'Package advantages are required';
      isValid = false;
    }
    if (!newPackage.disadvantages) {
      newErrors.disadvantages = 'Package disadvantages are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPackage = () => {
    if (!validateForm()) return;

    const newPackageObj = {
      id: packages.length ? Math.max(...packages.map((p) => p.id)) + 1 : 1,
      name: newPackage.name,
      price: Number(newPackage.price),
      advantages: newPackage.advantages,
      disadvantages: newPackage.disadvantages,
      sales: 0, // Default to 0 sales for new packages
    };

    const updatedPackages = [...packages, newPackageObj];
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    window.dispatchEvent(new Event('packages-updated'));
    setNewPackage({ name: '', price: '', advantages: '', disadvantages: '' });
    setIsAddPackageOpen(false);
    setErrors({ name: '', price: '', advantages: '', disadvantages: '' });
  };

  const handleDeletePackage = (id) => {
    const updatedPackages = packages.filter((pkg) => pkg.id !== id);
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    window.dispatchEvent(new Event('packages-updated'));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Packages</h2>
        <button
          onClick={() => setIsAddPackageOpen(true)}
          className="flex items-center text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Add new package"
        >
          <FiPlus className="mr-2" />
          Add Package
        </button>
      </div>

      {isAddPackageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Package</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Package Name
                </label>
                <input
                  id="packageName"
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.name}
                  aria-describedby="packageName-error"
                />
                {errors.name && (
                  <p id="packageName-error" className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.price}
                  aria-describedby="price-error"
                />
                {errors.price && (
                  <p id="price-error" className="text-red-500 text-xs mt-1">
                    {errors.price}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="advantages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Advantages (separate with commas)
                </label>
                <textarea
                  id="advantages"
                  value={newPackage.advantages}
                  onChange={(e) => setNewPackage({ ...newPackage, advantages: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  rows="3"
                  aria-invalid={!!errors.advantages}
                  aria-describedby="advantages-error"
                  placeholder="E.g. Responsive design, SEO optimization, Contact form"
                ></textarea>
                {errors.advantages && (
                  <p id="advantages-error" className="text-red-500 text-xs mt-1">
                    {errors.advantages}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="disadvantages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Disadvantages (separate with commas)
                </label>
                <textarea
                  id="disadvantages"
                  value={newPackage.disadvantages}
                  onChange={(e) => setNewPackage({ ...newPackage, disadvantages: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  rows="3"
                  aria-invalid={!!errors.disadvantages}
                  aria-describedby="disadvantages-error"
                  placeholder="E.g. No custom functionality, Limited pages, No e-commerce"
                ></textarea>
                {errors.disadvantages && (
                  <p id="disadvantages-error" className="text-red-500 text-xs mt-1">
                    {errors.disadvantages}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddPackageOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPackage}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Add Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-primary-600">${pkg.price}</p>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                {pkg.sales} Sales
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="p-2 text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                aria-label={`Edit package ${pkg.name}`}
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeletePackage(pkg.id)}
                className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-400"
                aria-label={`Delete package ${pkg.name}`}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Updated TemplatesTab Component
const TemplatesTab = ({ templates, setTemplates }) => {
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: '', category: '', image: '', imagecover: '', link: '', description: '', price: '' });
  const [errors, setErrors] = useState({ title: '', category: '', image: '', imagecover: '', link: '', description: '', price: '' });

  const validateForm = () => {
    const newErrors = { title: '', category: '', image: '', imagecover: '', link: '', description: '', price: '' };
    let isValid = true;

    if (!newTemplate.title) {
      newErrors.title = 'Template title is required';
      isValid = false;
    }
    if (!newTemplate.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }
    if (!newTemplate.image || !/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i.test(newTemplate.image)) {
      newErrors.image = 'Valid image URL is required';
      isValid = false;
    }
    if (!newTemplate.imagecover) {
      newErrors.imagecover = 'Please upload an image cover';
      isValid = false;
    }
    if (!newTemplate.link || !/^https?:\/\/.*$/.test(newTemplate.link)) {
      newErrors.link = 'Valid link URL is required';
      isValid = false;
    }
    if (!newTemplate.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!newTemplate.price || (newTemplate.price !== 'Free' && !/^\$\d+$/.test(newTemplate.price))) {
      newErrors.price = 'Price must be "Free" or a valid dollar amount (e.g., $49)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddTemplate = () => {
    if (!validateForm()) return;

    const newTemplateObj = {
      id: templates.length ? Math.max(...templates.map((t) => t.id)) + 1 : 1,
      title: newTemplate.title,
      category: newTemplate.category,
      image: newTemplate.image,
      imagecover: newTemplate.imagecover,
      link: newTemplate.link,
      description: newTemplate.description,
      price: newTemplate.price,
    };

    const updatedTemplates = [...templates, newTemplateObj];
    setTemplates(updatedTemplates);
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    window.dispatchEvent(new Event('templates-updated'));
    setNewTemplate({ title: '', category: '', image: '', imagecover: '', link: '', description: '', price: '' });
    setIsAddTemplateOpen(false);
    setErrors({ title: '', category: '', image: '', imagecover: '', link: '', description: '', price: '' });
  };

  const handleDeleteTemplate = (id) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    window.dispatchEvent(new Event('templates-updated'));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Templates</h2>
        <button
          onClick={() => setIsAddTemplateOpen(true)}
          className="flex items-center text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Add new template"
        >
          <FiPlus className="mr-2" />
          Add Template
        </button>
      </div>

      {isAddTemplateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Template</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="templateTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Title
                </label>
                <input
                  id="templateTitle"
                  type="text"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.title}
                  aria-describedby="templateTitle-error"
                />
                {errors.title && (
                  <p id="templateTitle-error" className="text-red-500 text-xs mt-1">
                    {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.category}
                  aria-describedby="category-error"
                />
                {errors.category && (
                  <p id="category-error" className="text-red-500 text-xs mt-1">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="imagecover" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image Cover Upload
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex justify-center items-center px-4 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{newTemplate.imagecover ? 'Change Image' : 'Upload Image'}</span>
                    <input
                      id="imagecover"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewTemplate({ ...newTemplate, imagecover: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  
                  {newTemplate.imagecover && (
                    <div className="relative">
                      <img
                        src={newTemplate.imagecover}
                        alt="Cover preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        onClick={() => setNewTemplate({ ...newTemplate, imagecover: '' })}
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {errors.imagecover && (
                  <p id="imagecover-error" className="text-red-500 text-xs mt-1">
                    {errors.imagecover}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Link
                </label>
                <input
                  id="link"
                  type="text"
                  value={newTemplate.link}
                  onChange={(e) => setNewTemplate({ ...newTemplate, link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  aria-invalid={!!errors.link}
                  aria-describedby="link-error"
                />
                {errors.link && (
                  <p id="link-error" className="text-red-500 text-xs mt-1">
                    {errors.link}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  rows="4"
                  aria-invalid={!!errors.description}
                  aria-describedby="description-error"
                />
                {errors.description && (
                  <p id="description-error" className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={newTemplate.price}
                  onChange={(e) => setNewTemplate({ ...newTemplate, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  placeholder="e.g., Free or $49"
                  aria-invalid={!!errors.price}
                  aria-describedby="price-error"
                />
                {errors.price && (
                  <p id="price-error" className="text-red-500 text-xs mt-1">
                    {errors.price}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddTemplateOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTemplate}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Add Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-48 object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found')}
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{template.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.description}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-primary-600">{template.category}</p>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {template.price}
                </span>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="p-2 text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                  aria-label={`Edit template ${template.title}`}
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  aria-label={`Delete template ${template.title}`}
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Updated SettingsTab Component
const SettingsTab = ({ pricing, setPricing }) => {
  const [passwordForm, setPasswordForm] = useState({ email: 'admin@codek.com', password: '', confirmPassword: '' });
  const [passwordErrors, setPasswordErrors] = useState({ password: '', confirmPassword: '' });
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [pricingForm, setPricingForm] = useState(pricing);
  const [pricingErrors, setPricingErrors] = useState({
    monthly: { basic: '', advanced: '', ultimate: '' },
    yearly: { basic: '', advanced: '', ultimate: '' }
  });

  const validatePasswordForm = () => {
    const newErrors = { password: '', confirmPassword: '' };
    let isValid = true;

    if (passwordForm.password && passwordForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (passwordForm.password !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  };

  const handlePasswordSubmit = () => {
    if (!validatePasswordForm()) return;
    console.log('Password updated');
    setPasswordForm({ ...passwordForm, password: '', confirmPassword: '' });
  };

  const validatePricingForm = () => {
    const newErrors = {
      monthly: { basic: '', advanced: '', ultimate: '' },
      yearly: { basic: '', advanced: '', ultimate: '' }
    };
    let isValid = true;

    ['monthly', 'yearly'].forEach((plan) => {
      ['basic', 'advanced', 'ultimate'].forEach((tier) => {
        const price = pricingForm[plan][tier];
        if (!price || !/^\$\d+$/.test(price)) {
          newErrors[plan][tier] = 'Price must be a valid dollar amount (e.g., $99)';
          isValid = false;
        }
      });
    });

    setPricingErrors(newErrors);
    return isValid;
  };

  const handlePricingSubmit = () => {
    if (!validatePricingForm()) return;

    setPricing(pricingForm);
    localStorage.setItem('pricing', JSON.stringify(pricingForm));
    window.dispatchEvent(new Event('pricing-updated'));
    setIsPricingModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      
      {/* Password Update Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6 max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Admin Password</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={passwordForm.email}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white"
              aria-readonly="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={passwordForm.password}
              onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              aria-invalid={!!passwordErrors.password}
              aria-describedby="password-error"
            />
            {passwordErrors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1">
                {passwordErrors.password}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              aria-invalid={!!passwordErrors.confirmPassword}
              aria-describedby="confirmPassword-error"
            />
            {passwordErrors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">
                {passwordErrors.confirmPassword}
              </p>
            )}
          </div>
          <button
            onClick={handlePasswordSubmit}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Pricing Management Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Pricing Plans</h3>
          <button
            onClick={() => setIsPricingModalOpen(true)}
            className="flex items-center text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            aria-label="Edit pricing plans"
          >
            <FiEdit className="mr-2" />
            Edit Pricing
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['monthly', 'yearly'].map((plan) => (
            <div key={plan}>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 capitalize">{plan} Pricing</h4>
              <div className="space-y-4">
                {['basic', 'advanced', 'ultimate'].map((tier) => (
                  <div key={tier} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{tier}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{pricing[plan][tier]}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{pricing[plan][`${tier}Label`]}</span>
                      </div>
                    </div>
                    {pricing[plan][`${tier}Saving`] && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">{pricing[plan][`${tier}Saving`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Edit Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Edit Pricing Plans</h3>
            <div className="space-y-6">
              {['monthly', 'yearly'].map((plan) => (
                <div key={plan}>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 capitalize">{plan} Pricing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['basic', 'advanced', 'ultimate'].map((tier) => (
                      <div key={tier}>
                        <label htmlFor={`${plan}-${tier}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                          {tier} Price
                        </label>
                        <input
                          id={`${plan}-${tier}`}
                          type="text"
                          value={pricingForm[plan][tier]}
                          onChange={(e) => setPricingForm({
                            ...pricingForm,
                            [plan]: { ...pricingForm[plan], [tier]: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                          aria-invalid={!!pricingErrors[plan][tier]}
                          aria-describedby={`${plan}-${tier}-error`}
                        />
                        {pricingErrors[plan][tier] && (
                          <p id={`${plan}-${tier}-error`} className="text-red-500 text-xs mt-1">
                            {pricingErrors[plan][tier]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsPricingModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePricingSubmit}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState(initialPackages);
  const [templates, setTemplates] = useState(initialTemplates);
  const [pricing, setPricing] = useState(initialPricing);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(recentTransactions);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const packageDistribution = useMemo(
    () =>
      packages.map((pkg) => ({
        name: `${pkg.name} ($${pkg.price})`,
        value: pkg.sales,
      })),
    [packages]
  );

  const totalSales = useMemo(() => packages.reduce((sum, pkg) => sum + pkg.sales, 0), [packages]);
  const totalRevenue = useMemo(() => {
    let revenue = packages.reduce((sum, pkg) => sum + pkg.price * pkg.sales, 0);
    templates.forEach((template) => {
      if (template.price !== 'Free') {
        const price = parseInt(template.price.replace('$', ''), 10);
        revenue += price * (template.purchases || 0); // Assuming purchases is 0 if not provided
      }
    });
    return revenue;
  }, [packages, templates]);
  const totalTemplateSales = useMemo(() => templates.reduce((sum, template) => sum + (template.purchases || 0), 0), [templates]);

  useEffect(() => {
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/signin');
      return;
    }

    const loadUsers = () => {
      setLoading(true);
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const enhancedUsers = storedUsers.map((user) => ({
          ...user,
          createdAt: user.createdAt || new Date().toISOString(),
        }));
        setUsers(enhancedUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const loadPackages = () => {
      try {
        const storedPackages = JSON.parse(localStorage.getItem('packages') || JSON.stringify(initialPackages));
        setPackages(storedPackages);
      } catch (error) {
        console.error('Error loading packages:', error);
        setPackages(initialPackages);
      }
    };

    const loadTemplates = () => {
      try {
        const storedTemplates = JSON.parse(localStorage.getItem('templates') || JSON.stringify(templates));
        setTemplates(storedTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
        setTemplates(templates);
      }
    };

    const loadPricing = () => {
      try {
        const storedPricing = JSON.parse(localStorage.getItem('pricing') || JSON.stringify(pricing));
        setPricing(storedPricing);
      } catch (error) {
        console.error('Error loading pricing:', error);
        setPricing(pricing);
      }
    };

    loadUsers();
    loadPackages();
    loadTemplates();
    loadPricing();

    window.addEventListener('users-updated', loadUsers);
    window.addEventListener('packages-updated', loadPackages);
    window.addEventListener('templates-updated', loadTemplates);
    window.addEventListener('pricing-updated', loadPricing);

    return () => {
      window.removeEventListener('users-updated', loadUsers);
      window.removeEventListener('packages-updated', loadPackages);
      window.removeEventListener('templates-updated', loadTemplates);
      window.removeEventListener('pricing-updated', loadPricing);
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('auth-state-change'));
    navigate('/signin');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
              <div className="flex items-center space-x-3">
                <select
                  className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Select time range"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last Year</option>
                </select>
                <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors">
                  <FiCalendar className="mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value={users.length}
                icon={<FiUsers size={24} />}
                trend="+24% from last month"
                color="from-primary-500 to-primary-700"
              />
              <StatsCard
                title="Package Sales"
                value={totalSales}
                icon={<FiPackage size={24} />}
                trend="+12% from last month"
                color="from-purple-500 to-purple-700"
              />
              <StatsCard
                title="Template Sales"
                value={totalTemplateSales}
                icon={<FiGrid size={24} />}
                trend="+18% from last month"
                color="from-blue-500 to-blue-700"
              />
              <StatsCard
                title="Total Revenue"
                value={`$${totalRevenue}`}
                icon={<FiBarChart2 size={24} />}
                trend="+32% from last month"
                color="from-emerald-500 to-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer title="Revenue Trends">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    aria-label="Revenue trends chart"
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer title="Weekly User Activity">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userActivity}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    aria-label="Weekly user activity chart"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      activeDot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 6 }}
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Package Distribution</h3>
                  <div className="space-y-4">
                    {packageDistribution.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value} sales</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-primary-500' : index === 1 ? 'bg-purple-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(item.value / totalSales) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
                    <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="overflow-hidden">
                    <div className="-mx-4 -my-2 overflow-x-auto">
                      <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Package</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.slice(0, 5).map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center">
                                      {transaction.customer.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{transaction.package}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{transaction.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${transaction.amount}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                    {transaction.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UsersTab users={users} setUsers={setUsers} />;
      case 'packages':
        return <PackagesTab packages={packages} setPackages={setPackages} />;
      case 'templates':
        return <TemplatesTab templates={templates} setTemplates={setTemplates} />;
      case 'settings':
        return <SettingsTab pricing={pricing} setPricing={setPricing} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
        <div
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } fixed md:static z-20 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 transition-all duration-300 ease-in-out md:flex md:flex-col`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-dark-700">
            <div className="flex items-center">
              <span className="bg-primary-600 text-white p-2 rounded-lg">
                <FiPackage className="h-6 w-6" />
              </span>
              {isSidebarOpen && <h1 className="ml-3 text-lg font-bold text-gray-900 dark:text-white">Codek Admin</h1>}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {isSidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {['overview', 'users', 'packages', 'templates', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700/50'
                  }`}
                  aria-current={activeTab === tab ? 'page' : undefined}
                >
                  {tab === 'overview' && <FiHome className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />}
                  {tab === 'users' && <FiUsers className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />}
                  {tab === 'packages' && <FiPackage className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />}
                  {tab === 'templates' && <FiGrid className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />}
                  {tab === 'settings' && <FiSettings className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />}
                  {isSidebarOpen && <span className="ml-3 capitalize">{tab}</span>}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-dark-700">
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors`}
              aria-label="Logout"
            >
              <FiLogOut className={`flex-shrink-0 h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>

        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-md z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center md:hidden">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-primary-600 hover:text-primary-800 focus:outline-none"
                    aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                  >
                    <FiMenu className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex items-center justify-start lg:justify-center">
                  <div className="w-full lg:w-auto">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Search packages, templates, users..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {isDarkMode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                  </button>
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className="relative text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Notifications"
                      aria-expanded={isNotificationsOpen}
                    >
                      <FiBell className="h-6 w-6" />
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-800"></span>
                    </button>
                    {isNotificationsOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-dark-700 focus:outline-none z-20">
                        <div className="px-4 py-3">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                        </div>
                        <div className="py-1 max-h-60 overflow-y-auto">
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700"
                            role="menuitem"
                          >
                            <div className="flex-shrink-0 bg-primary-500 rounded-full p-1">
                              <FiUsers className="h-4 w-4 text-white" />
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">1 minute ago</p>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700"
                            role="menuitem"
                          >
                            <div className="flex-shrink-0 bg-green-500 rounded-full p-1">
                              <FiPackage className="h-4 w-4 text-white" />
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                            </div>
                          </a>
                        </div>
                        <div className="py-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-center text-primary-600 dark:text-primary-400 font-medium"
                            role="menuitem"
                          >
                            View all notifications
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center text-sm bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      aria-label="Quick actions"
                      aria-expanded={isDropdownOpen}
                    >
                      <FiPlus className="mr-2" />
                      <span>Quick Actions</span>
                    </button>
                    {isDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-20 divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            role="menuitem"
                          >
                            <FiPackage className="mr-2 text-primary-500" />
                            Add New Package
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            role="menuitem"
                          >
                            <FiGrid className="mr-2 text-purple-500" />
                            Add New Template
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            role="menuitem"
                          >
                            <FiUsers className="mr-2 text-blue-500" />
                            Add New User
                          </button>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            role="menuitem"
                          >
                            <FiLogOut className="mr-2" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-900 p-4 sm:p-6 lg:p-8">
            {loading ? <div className="text-center">Loading...</div> : renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;