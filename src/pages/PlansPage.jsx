import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PlansPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Define pricing for monthly and yearly billing cycles
  const pricing = {
    monthly: {
      basic: 'Free',
      pro: '$49',
      proLabel: '/month',
      enterprise: '$99',
      enterpriseLabel: '/month'
    },
    yearly: {
      basic: 'Free',
      pro: '$39',
      proLabel: '/month',
      proSaving: 'Save $120/year',
      enterprise: '$79',
      enterpriseLabel: '/month',
      enterpriseSaving: 'Save $240/year'
    }
  };
  
  const toggleBillingCycle = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-dark-900 min-h-screen">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan that works for you</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select the perfect plan for your needs. All plans include access to our website builder, 
            templates, and customer support.
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
              Monthly
            </button>
            <button
              className={`py-2 px-6 rounded-md text-sm font-medium ${
                billingCycle === 'yearly'
                  ? 'bg-secondary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => toggleBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-primary-50 dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Basic</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create interactive forms that connect to your workflow
              </p>
              <div className="mb-6 p-4">
                <span className="text-4xl font-bold">{pricing[billingCycle].basic}</span>
              </div>
              <Link
                to="/signup"
                className="block w-full py-3 px-4 rounded-md border border-gray-300 dark:border-gray-600 font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
              >
                Get Basic
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-dark-600 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Access basic data</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Limited access to premium community content</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Basic portfolio analysis tools</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <FiX className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-500 dark:text-gray-500">Unlimited access to all premium features</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <FiX className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-500 dark:text-gray-500">Real-time stock data and insights</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Monthly/Pro Plan */}
          <div className="bg-primary-900 text-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Monthly</h3>
              <p className="text-gray-300 mb-6">
                Make your forms more beautiful and on-brand
              </p>
              <div className="mb-6 p-1">
                <span className="text-4xl font-bold">{pricing[billingCycle].pro}</span>
                <span className="text-gray-300">{pricing[billingCycle].proLabel}</span>
                {billingCycle === 'yearly' && (
                  <div className="mt-2 text-sm text-green-400 font-medium">{pricing.yearly.proSaving}</div>
                )}
              </div>
              <Link
                to="/payment"
                className="block w-full py-3 px-4 rounded-md bg-white text-primary-600 font-medium text-center hover:bg-gray-100 transition duration-200"
              >
                Get Monthly
              </Link>
            </div>
            <div className="bg-primary-800 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Unlimited access to all premium features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Real-time stock data and insights</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Unlimited access to research reports</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Advanced portfolio analysis tools</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Full access to the Business Quant community</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Annual Plan */}
          <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Annual</h3>
              <p className="text-gray-600 dark:text-yellow-300 mb-6">
                Analyze performance and do more with your data
              </p>
              <div className="mb-6 p-1">
                <span className="text-4xl font-bold">{pricing[billingCycle].enterprise}</span>
                <span className="text-gray-600 dark:text-yellow-300">{pricing[billingCycle].enterpriseLabel}</span>
                {billingCycle === 'yearly' && (
                  <div className="mt-2 text-sm text-yellow-500 dark:text-yellow-300 font-medium">{pricing.yearly.enterpriseSaving}</div>
                )}
              </div>
              <Link
                to="/payment"
                className="block w-full py-3 px-4 rounded-md bg-yellow-400 text-yellow-900 font-medium text-center hover:bg-yellow-500 transition duration-200"
              >
                Get Annual
              </Link>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800 p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-yellow-100">Unlimited access to all premium features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-yellow-100">Real-time stock data and insights</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-yellow-100">Unlimited access to research reports</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-yellow-100">Advanced portfolio analysis tools</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-yellow-100">Full access to the Business Quant community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Feature comparison table */}
        <div className="mt-20 max-w-6xl mx-auto bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold">Compare Plans</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 dark:text-gray-300">Features</th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 dark:text-gray-300">Basic</th>
                  <th className="py-4 px-6 text-center font-semibold text-primary-600 dark:text-primary-400">Monthly</th>
                  <th className="py-4 px-6 text-center font-semibold text-yellow-600 dark:text-yellow-400">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Number of websites</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">1</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">3</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Storage space</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">500 MB</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">5 GB</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">50 GB</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Bandwidth</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Limited</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Unlimited</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Custom domain</td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Codak branding</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">Yes</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">No</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-700 dark:text-gray-300">No</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Premium templates</td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">Priority support</td>
                  <td className="py-4 px-6 text-center">
                    <FiX className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;