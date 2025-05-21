import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 dark:bg-primary-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="mt-2 text-primary-100">Last updated: May 21, 2025</p>
        </div>
        
        <div className="p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. What Are Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. How We Use Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              When you use and access the Service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
              <li><strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the "remember me" functionality of a registered user or a user's language preference.</li>
              <li><strong>Analytics cookies.</strong> We may use analytics cookies to track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.</li>
              <li><strong>Targeting cookies.</strong> These type of cookies are used to deliver advertisements on and through the Service and track the performance of these advertisements. These cookies may also be used to enable third-party advertising networks to deliver ads that may be relevant to you based upon your activities or interests.</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Third-Party Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. What Are Your Choices Regarding Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
            <div className="pl-6 space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">For the Chrome web browser</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">this page from Google</a>.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">For the Internet Explorer web browser</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">this page from Microsoft</a>.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">For the Firefox web browser</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">this page from Mozilla</a>.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">For the Safari web browser</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">this page from Apple</a>.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">For any other web browser</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Please search for "how to delete cookies" in your web browser or visit your web browser's official website.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Cookie Consent</h2>
            <p className="text-gray-700 dark:text-gray-300">
              When you first visit our website, we will ask for your consent to use cookies. You can choose to accept or decline cookies. If you decline, certain features of the website may not function properly.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Changes to This Cookie Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this Cookie Policy.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">7. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about our Cookie Policy, please contact us at privacy@codek.com.
            </p>
          </section>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-6">
              <Link to="/terms-of-service" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
