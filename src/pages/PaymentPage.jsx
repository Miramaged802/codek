import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [template, setTemplate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    fullName: '',
    billingAddress: '',
    country: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    rememberCard: false,
    paypalEmail: '',
    instaEmail: '',
    instaPhone: '',
    fawryReferenceNumber: '',
    fawryPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    // Handle data from template selection
    if (location.state?.template) {
      setTemplate(location.state.template);
    } 
    // Handle data from package form
    else if (location.state?.packageData && location.state?.fromPackageForm) {
      // Always create a package template object that prioritizes package info
      const packageType = location.state.packageData.packageType;
      const packagePrices = {
        'basic': '$100',
        'advanced': '$300',
        'ultimate': '$1000'
      };
      
      // Get image from selected template or use default
      const templateImage = location.state.selectedTemplate ? 
        location.state.selectedTemplate.image : 
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg';
      
      // Create package template with selected template details if available
      const packageTemplate = {
        id: 'package-' + Date.now(),
        title: packageType.charAt(0).toUpperCase() + packageType.slice(1) + ' Website Package',
        category: 'package',
        image: templateImage,
        description: location.state.packageData.description || 'Custom website package',
        price: packagePrices[packageType] || '$1000',
        packageType: packageType,
        templateName: location.state.selectedTemplate ? location.state.selectedTemplate.title : 'Custom Template'
      };
      
      setTemplate(packageTemplate);
    } 
    // If no data, redirect to templates
    else {
      navigate('/templates');
    }
  }, [location.state, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };
  
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    setFormData(prevData => ({
      ...prevData,
      cardNumber: formatCardNumber(value)
    }));
  };
  
  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    
    setFormData(prevData => ({
      ...prevData,
      expirationDate: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentSuccess(true);
      
      if (template) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          const savedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
          if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            const newFavorites = favorites.filter(id => id !== template.id);
            localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(newFavorites));
          }
          
          const purchasedTemplates = JSON.parse(localStorage.getItem(`purchased_${currentUser.id}`) || '[]');
          purchasedTemplates.push({
            ...template,
            purchaseDate: new Date().toISOString()
          });
          localStorage.setItem(`purchased_${currentUser.id}`, JSON.stringify(purchasedTemplates));
        }
      }
    }, 2000);
  };
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading payment details...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we prepare your checkout experience</p>
        </div>
      </div>
    );
  }
  
  const getPrice = () => {
    if (template.price === 'Free') return 0;
    return parseInt(template.price.replace('$', ''));
  };
  
  const totalAmount = getPrice();
  
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-700 shadow-lg rounded-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <FiCheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold">Payment Successful!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your template is now ready to use.
          </p>
          
          <div className="mt-6">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                PURCHASED
              </div>
            </div>
            <h3 className="text-xl font-bold mt-4">{template.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{template.description}</p>
          </div>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between mb-1">
              <span>Template:</span>
              <span>{template.title}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Category:</span>
              <span className="capitalize">{template.category}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Amount:</span>
              <span>{template.price}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Payment method:</span>
              <span>{paymentMethod === 'creditCard' ? `Credit Card (ending in ${formData.cardNumber.slice(-4)})` : paymentMethod}</span>
            </div>
            <div className="mt-8 space-y-3">
              <button
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition duration-200"
                onClick={() => navigate('/profile')}
              >
                Go to My Profile
              </button>
              <button
                className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md font-medium transition duration-200"
                onClick={() => navigate('/templates')}
              >
                Browse More Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 py-12">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              <FiArrowLeft className="mr-2" />
              Back to Templates
            </button>
            
            <div className="text-sm breadcrumbs hidden md:flex">
              <ul className="flex space-x-2 text-gray-500 dark:text-gray-400">
                <li className="after:content-['/'] after:mx-2">
                  <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
                </li>
                <li className="after:content-['/'] after:mx-2">
                  <a href="/templates" className="hover:text-primary-600 dark:hover:text-primary-400">Templates</a>
                </li>
                <li className="font-medium text-primary-600 dark:text-primary-400">Checkout</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="card bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary-600 dark:bg-primary-700 p-6 text-white">
                  <h2 className="text-2xl font-bold">Secure Checkout</h2>
                  <p className="text-primary-100 mt-1">Complete your purchase securely with your preferred payment method</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div 
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all shadow-sm hover:shadow-md ${
                          paymentMethod === 'creditCard' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        onClick={() => setPaymentMethod('creditCard')}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          <FiCreditCard className={`h-8 w-8 ${paymentMethod === 'creditCard' ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400'}`} />
                        </div>
                        <span className="font-medium">Credit Card</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Visa, Mastercard, etc.</span>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all shadow-sm hover:shadow-md ${
                          paymentMethod === 'paypal' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-8 w-auto object-contain" />
                        </div>
                        <span className="font-medium">PayPal</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Fast & secure</span>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all shadow-sm hover:shadow-md ${
                          paymentMethod === 'instapay' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        onClick={() => setPaymentMethod('instapay')}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          <img src="/img/unnamed.png" alt="Instapay" className="h-10 w-10 object-contain" />
                        </div>
                        <span className="font-medium">InstaPay</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Fast mobile payments</span>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all shadow-sm hover:shadow-md ${
                          paymentMethod === 'fawry' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        onClick={() => setPaymentMethod('fawry')}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mb-2">
                          <img src="/img/فوري.png" alt="Fawry" className="h-10 w-10 object-contain" />
                        </div>
                        <span className="font-medium">Fawry</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pay at service points</span>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'creditCard' && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">CARD INFORMATION</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="cardNumber" className="form-label">Card Number</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              className="form-input pl-10"
                              placeholder="0000 0000 0000 0000"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiCreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="expirationDate" className="form-label">Expiration date</label>
                          <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleExpirationDateChange}
                            className="form-input"
                            placeholder="MM / YY"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="securityCode" className="form-label">Security code</label>
                          <input
                            type="password"
                            id="securityCode"
                            name="securityCode"
                            value={formData.securityCode}
                            onChange={handleChange}
                            maxLength="4"
                            className="form-input"
                            placeholder="•••"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">PAYPAL INFORMATION</h2>
                      <div className="mb-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                          <div className="flex items-center mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-6 mr-2" />
                            <span className="font-medium">Secure PayPal Checkout</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            You'll be redirected to PayPal to complete your payment securely.
                          </p>
                        </div>
                        <div>
                          <label htmlFor="paypalEmail" className="form-label">PayPal Email</label>
                          <input
                            type="email"
                            id="paypalEmail"
                            name="paypalEmail"
                            value={formData.paypalEmail}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="your-email@paypal.com"
                            required
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Enter the email address associated with your PayPal account
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {paymentMethod === 'instapay' && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">INSTAPAY INFORMATION</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="instaEmail" className="form-label">Email</label>
                          <input
                            type="email"
                            id="instaEmail"
                            name="instaEmail"
                            value={formData.instaEmail}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="example@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="instaPhone" className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            id="instaPhone"
                            name="instaPhone"
                            value={formData.instaPhone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="(123) 456-7890"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {paymentMethod === 'fawry' && (
                    <>
                      <h2 className="text-lg font-semibold mb-4">FAWRY INFORMATION</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="fawryReferenceNumber" className="form-label">Reference Number</label>
                          <input
                            type="text"
                            id="fawryReferenceNumber"
                            name="fawryReferenceNumber"
                            value={formData.fawryReferenceNumber}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="1234567890"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="fawryPhone" className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            id="fawryPhone"
                            name="fawryPhone"
                            value={formData.fawryPhone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="(123) 456-7890"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <h2 className="text-lg font-semibold mb-4">BILLING INFORMATION</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="form-label">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">--select--</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="123 Main St, Apt 4B"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="state" className="form-label">State</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">--select--</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="NY">New York</option>
                        <option value="FL">Florida</option>
                        <option value="IL">Illinois</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="form-label">Zip or Postal Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                  
                  {paymentMethod === 'creditCard' && (
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          id="rememberCard"
                          name="rememberCard"
                          type="checkbox"
                          checked={formData.rememberCard}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="rememberCard" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Remember this card for future use
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Checkout'}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="card sticky top-20">
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold mb-4">{template.packageType ? 'Package Summary' : 'Template Summary'}</h2>
                  <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                    <div className="relative">
                      <img 
                        src={template.image} 
                        alt={template.title} 
                        className="w-full h-40 object-cover" 
                      />
                      <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {template.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{template.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                      
                      {template.packageType ? (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">Package Type:</span>
                            <span className="ml-2 capitalize">{template.packageType}</span>
                          </div>
                          {template.templateName && (
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-medium">Selected Template:</span>
                              <span className="ml-2">{template.templateName}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="capitalize">{template.category}</span>
                          <span className="mx-2">•</span>
                          <span>{template.downloads} downloads</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold mb-2">What's included:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Full template source code</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Documentation and setup guide</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">6 months of updates</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Customer support</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Template price:</span>
                    <span>{template.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span>Processing fee:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold mb-1 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span>Total:</span>
                    <span>{template.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    One-time payment, no recurring charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;