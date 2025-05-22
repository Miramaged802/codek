import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

const PackageFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    packageType: location.state?.packageType || 'basic',
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    description: '',
    templateId: location.state?.templateId || '',
    templateCategory: '',
    customRequirements: '',
    budget: '',
    timeline: '',
    additionalInfo: ''
  });
  
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    // Fetch templates (in a real app, this would be an API call)
    setTemplates([
      { id: 1, title: 'Business Portfolio', category: 'business', image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg', description: 'Professional business portfolio template with modern design', price: 'Free' },
      { id: 2, title: 'Creative Agency', category: 'creative', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', description: 'Dynamic template for creative agencies and studios', price: '$49' },
      { id: 3, title: 'E-commerce Store', category: 'ecommerce', image: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg', description: 'Complete e-commerce solution with shopping cart', price: '$99' },
      { id: 4, title: 'Personal Blog', category: 'blog', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', description: 'Clean and minimal blog template', price: 'Free' },
      { id: 5, title: 'Restaurant Website', category: 'business', image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg', description: 'Perfect template for restaurants and cafes', price: '$49' },
      { id: 6, title: 'Photography Portfolio', category: 'creative', image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg', description: 'Showcase your photography work', price: '$49' }
    ]);
    
    // Load saved form data from localStorage if available
    const savedFormData = localStorage.getItem('packageFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData(prev => ({
        ...prev,
        ...parsedData
      }));
    }
    // If we have a templateId from location state, pre-select it
    else if (location.state?.templateId) {
      setFormData(prev => ({
        ...prev,
        templateId: location.state.templateId,
        selectedTemplate: location.state.selectedTemplate
      }));
    }
  }, [location.state]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    // Update state
    setFormData(updatedFormData);
    
    // Save to localStorage
    localStorage.setItem('packageFormData', JSON.stringify(updatedFormData));
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Find the selected template if we have a templateId
    let selectedTemplate = null;
    if (formData.packageType === 'basic' && formData.templateId) {
      selectedTemplate = templates.find(t => t.id.toString() === formData.templateId.toString());
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // For all package types, redirect to payment after 2 seconds
      setTimeout(() => {
        navigate('/payment', { 
          state: { 
            packageData: formData,
            selectedTemplate: selectedTemplate,
            fromPackageForm: true
          } 
        });
        
        // Clear the form data from localStorage after successful submission
        localStorage.removeItem('packageFormData');
      }, 2000);
    }, 1500);
  };
  
  // Render different form fields based on package type
  const renderFormFields = () => {
    // Common fields for all packages
    if (currentStep === 1) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company/Organization</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Website (if any)</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="https://"
            />
          </div>
        </div>
      );
    }
    
    // Package specific fields
    if (formData.packageType === 'basic' && currentStep === 2) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Basic Customization</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a template and provide basic customization details for your website.
          </p>
          
          <div className="mb-6">
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Choose a Template *</label>
            <div className="flex items-center space-x-2">
              <select
                id="templateId"
                name="templateId"
                value={formData.templateId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>{template.title}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  // Save current form data to localStorage before navigating
                  localStorage.setItem('packageFormData', JSON.stringify(formData));
                  
                  // Navigate to templates page with return info
                  navigate('/templates', { 
                    state: { 
                      returnTo: '/package-form', 
                      packageType: 'basic',
                      fromForm: true // Flag to indicate we're coming from the form
                    } 
                  });
                }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
              >
                Browse Templates
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customization Requirements *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Describe the customizations you need (colors, branding, content, etc.)"
            ></textarea>
          </div>
        </div>
      );
    } else if (formData.packageType === 'advanced' && currentStep === 2) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Advanced Customization</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a template and provide advanced customization details for your website.
          </p>
          
          <div className="mb-6">
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Choose a Template *</label>
            <div className="flex items-center space-x-2">
              <select
                id="templateId"
                name="templateId"
                value={formData.templateId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>{template.title}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  // Save current form data to localStorage before navigating
                  localStorage.setItem('packageFormData', JSON.stringify(formData));
                  
                  // Navigate to templates page with return info
                  navigate('/templates', { 
                    state: { 
                      returnTo: '/package-form', 
                      packageType: 'advanced',
                      fromForm: true // Flag to indicate we're coming from the form
                    } 
                  });
                }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
              >
                Browse Templates
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="customRequirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Requirements *</label>
            <textarea
              id="customRequirements"
              name="customRequirements"
              value={formData.customRequirements}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Describe your specific requirements and features needed"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline *</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select timeline</option>
                <option value="Less than 1 month">Less than 1 month</option>
                <option value="1-2 months">1-2 months</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3+ months">3+ months</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Who is your target audience?"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="businessGoals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Goals</label>
            <textarea
              id="businessGoals"
              name="businessGoals"
              value={formData.businessGoals || ''}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="What are your main business goals for this website?"
            ></textarea>
          </div>
        </div>
      );
    } else if (formData.packageType === 'ultimate' && currentStep === 2) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Ultimate Package Details</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Provide comprehensive details for your enterprise-level website.
          </p>
          
          <div className="mb-6">
            <label htmlFor="customRequirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Requirements *</label>
            <textarea
              id="customRequirements"
              name="customRequirements"
              value={formData.customRequirements}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Describe your business goals, target audience, and specific requirements"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Range *</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select budget range</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                <option value="$20,000 - $50,000">$20,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline *</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select timeline</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Any other details you'd like to share about your project"
            ></textarea>
          </div>
        </div>
      );
    }
    
    // Review step for all packages
    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please review your information before submitting.
          </p>
          
          <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Package Type</h3>
              <p className="text-gray-900 dark:text-white capitalize">{formData.packageType}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Name</h3>
                <p className="text-gray-900 dark:text-white">{formData.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Email</h3>
                <p className="text-gray-900 dark:text-white">{formData.email}</p>
              </div>
              {formData.phone && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Phone</h3>
                  <p className="text-gray-900 dark:text-white">{formData.phone}</p>
                </div>
              )}
              {formData.company && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Company</h3>
                  <p className="text-gray-900 dark:text-white">{formData.company}</p>
                </div>
              )}
            </div>
            
            {formData.website && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Current Website</h3>
                <p className="text-gray-900 dark:text-white">{formData.website}</p>
              </div>
            )}
            
            {formData.packageType === 'basic' && formData.templateId && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Selected Template</h3>
                <p className="text-gray-900 dark:text-white">
                  {templates.find(t => t.id.toString() === formData.templateId.toString())?.title || 'Custom Template'}
                </p>
              </div>
            )}
            
            {(formData.description || formData.customRequirements) && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Requirements</h3>
                <p className="text-gray-900 dark:text-white whitespace-pre-line">
                  {formData.description || formData.customRequirements}
                </p>
              </div>
            )}
            
            {formData.budget && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Budget Range</h3>
                <p className="text-gray-900 dark:text-white">{formData.budget}</p>
              </div>
            )}
            
            {formData.timeline && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Timeline</h3>
                <p className="text-gray-900 dark:text-white">{formData.timeline}</p>
              </div>
            )}
            
            {formData.additionalInfo && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Additional Information</h3>
                <p className="text-gray-900 dark:text-white whitespace-pre-line">{formData.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  };
  
  // Render success message
  const renderSuccessMessage = () => {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 dark:bg-green-900 rounded-full">
          <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Submitted Successfully!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your interest in our {formData.packageType} package. We'll review your request and get back to you shortly.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Redirecting you to payment...
        </p>
        <div className="inline-flex items-center justify-center">
          <div className="w-6 h-6 border-t-2 border-b-2 border-primary-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  // Get package name based on type
  const getPackageName = () => {
    switch (formData.packageType) {
      case 'basic':
        return 'Basic Website';
      case 'advanced':
        return 'Advanced Website';
      case 'ultimate':
        return 'Ultimate Website';
      default:
        return 'Website';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/packages')} 
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Packages
        </button>
        
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {!submitSuccess ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getPackageName()} Request</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Please provide the details for your project</p>
                </div>
                
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex justify-between">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                        >
                          {step}
                        </div>
                        <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                          {step === 1 ? 'Contact' : step === 2 ? 'Details' : 'Review'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-between">
                      <div className={`w-1/3 border-t-2 ${currentStep >= 2 ? 'border-primary-600' : 'border-transparent'}`}></div>
                      <div className={`w-1/3 border-t-2 ${currentStep >= 3 ? 'border-primary-600' : 'border-transparent'}`}></div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {renderFormFields()}
                  
                  <div className="mt-8 flex justify-between">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="ml-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              renderSuccessMessage()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageFormPage;

