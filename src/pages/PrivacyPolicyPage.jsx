import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 dark:bg-primary-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-primary-100">Last updated: May 21, 2025</p>
        </div>
        
        <div className="p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Codek ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.codek.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            
            <div className="pl-6 space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Personal Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Derivative Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Financial Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Use of Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Create and manage your account.</li>
              <li>Process your purchases, orders, and payments.</li>
              <li>Send you email newsletters, if you have opted in to receive them.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Disclosure of Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            
            <div className="pl-6 space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">By Law or to Protect Rights</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Third-Party Service Providers</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Business Transfers</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If we or our subsidiaries are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. We will notify you before your information is transferred and becomes subject to a different privacy policy.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Security of Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Your Rights Regarding Your Data</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You have certain rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Right to Access</strong> - You have the right to request copies of your personal data.</li>
              <li><strong>Right to Rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to Erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>Right to Restrict Processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Right to Object to Processing</strong> - You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>Right to Data Portability</strong> - You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">7. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Site is not intended for individuals under the age of 13. We do not knowingly collect personal identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to take necessary actions.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">9. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@codek.com.
            </p>
          </section>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-6">
              <Link to="/terms-of-service" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</Link>
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
