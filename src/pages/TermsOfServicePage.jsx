import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 dark:bg-primary-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-primary-100">Last updated: May 21, 2025</p>
        </div>
        
        <div className="p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to Codek ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at www.codek.com ("Service") operated by Codek.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here: <Link to="/privacy-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. Communications</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By creating an Account on our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Purchases</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Templates and Content</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our Service allows you to purchase and download templates. You acknowledge and agree that you shall not use our templates for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You are granted a non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms. As a condition of your use of the Service, you warrant to Codek that you will not use the Service for any purpose that is unlawful or prohibited by these Terms.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Refunds</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Certain refund requests for Purchases may be considered by Codek on a case-by-case basis and granted at the sole discretion of Codek. Due to the digital nature of our products, most purchases are non-refundable once the template has been downloaded.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300">
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Codek and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Codek.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">7. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              In no event shall Codek, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">9. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">10. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at support@codek.com.
            </p>
          </section>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-6">
              <Link to="/privacy-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
              <Link to="/cookie-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</Link>
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
