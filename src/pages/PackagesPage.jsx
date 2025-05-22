import { useState } from 'react';
import { FiCheck, FiX, FiCode, FiEdit, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PackagesPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Define pricing for monthly and yearly billing cycles
  const pricing = {
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
  
  const toggleBillingCycle = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-dark-900 min-h-screen">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Website Development Packages</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the perfect package for your website development needs. From basic customization to complete custom development.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
            <button
              className={`py-2 px-6 rounded-md text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-secondary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => toggleBillingCycle('monthly')}
            >
              One-time
            </button>
            <button
              className={`py-2 px-6 rounded-md text-sm font-medium ${
                billingCycle === 'yearly'
                  ? 'bg-secondary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => toggleBillingCycle('yearly')}
            >
              Subscription
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Package */}
          <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEdit className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Basic Customization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Customize one of our existing templates to match your brand
              </p>
              <div className="mb-6 p-4">
                <span className="text-4xl font-bold">{pricing[billingCycle].basic}</span>
                <span className="text-gray-500 dark:text-gray-400">{pricing[billingCycle].basicLabel}</span>
                {billingCycle === 'yearly' && (
                  <p className="text-green-500 text-sm mt-2">{pricing[billingCycle].basicSaving}</p>
                )}
              </div>
              <Link
                to="/package-form"
                state={{ packageType: 'basic' }}
                className="block w-full py-3 px-4 rounded-md bg-primary-600 text-white font-medium text-center hover:bg-primary-700 transition duration-200"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-dark-600 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Choose from existing templates</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom colors and branding</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Content upload (up to 5 pages)</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Basic SEO setup</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Mobile responsive design</span>
                </li>
                <li className="flex items-center">
                  <FiX className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom functionality</span>
                </li>
                <li className="flex items-center">
                  <FiX className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">E-commerce integration</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Advanced Package */}
          <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 transform translate-y-[-8px] ring-2 ring-primary-500 dark:ring-primary-400">
            <div className="bg-primary-600 text-white py-2 text-center text-sm font-medium">
              Most Popular
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSettings className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Customization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Enhanced template with custom functionality and integrations
              </p>
              <div className="mb-6 p-4">
                <span className="text-4xl font-bold">{pricing[billingCycle].advanced}</span>
                <span className="text-gray-500 dark:text-gray-400">{pricing[billingCycle].advancedLabel}</span>
                {billingCycle === 'yearly' && (
                  <p className="text-green-500 text-sm mt-2">{pricing[billingCycle].advancedSaving}</p>
                )}
              </div>
              <Link
                to="/package-form"
                state={{ packageType: 'advanced' }}
                className="block w-full py-3 px-4 rounded-md bg-primary-600 text-white font-medium text-center hover:bg-primary-700 transition duration-200"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-dark-600 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">All Basic features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom page layouts</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Content upload (up to 15 pages)</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Advanced SEO optimization</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Basic e-commerce functionality</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Contact forms and integrations</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Social media integration</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Ultimate Package */}
          <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCode className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Custom Development</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fully custom website built from scratch to your specifications
              </p>
              <div className="mb-6 p-4">
                <span className="text-4xl font-bold">{pricing[billingCycle].ultimate}</span>
                <span className="text-gray-500 dark:text-gray-400">{pricing[billingCycle].ultimateLabel}</span>
                {billingCycle === 'yearly' && (
                  <p className="text-green-500 text-sm mt-2">{pricing[billingCycle].ultimateSaving}</p>
                )}
              </div>
              <Link
                to="/package-form"
                state={{ packageType: 'ultimate' }}
                className="block w-full py-3 px-4 rounded-md bg-primary-600 text-white font-medium text-center hover:bg-primary-700 transition duration-200"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-dark-600 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">All Advanced features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom design from scratch</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited pages</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Advanced e-commerce functionality</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Custom database development</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">API integrations</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Premium SEO optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Package Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-dark-800 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-dark-700">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Basic</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Advanced</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Custom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Price</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">{pricing.monthly.basic}</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">{pricing.monthly.advanced}</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">{pricing.monthly.ultimate}</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Design customization</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Limited</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Advanced</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Complete</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Number of pages</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Up to 5</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Up to 15</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Revision rounds</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">2</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">3</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">5</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">E-commerce functionality</td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Basic</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Advanced</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Custom database</td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">SEO optimization</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Basic</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Advanced</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Premium</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Delivery time</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">1-2 weeks</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">2-4 weeks</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">4-8 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PackagesPage;
