import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatButton from './components/ChatButton'
import HomePage from './pages/HomePage'
import PlansPage from './pages/PlansPage'
import PackagesPage from './pages/PackagesPage'
import PackageFormPage from './pages/PackageFormPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import PaymentPage from './pages/PaymentPage'
import TemplatesPage from './pages/TemplatesPage'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import CookiePolicyPage from './pages/CookiePolicyPage'

import { useTheme } from './contexts/ThemeContext'

function App() {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/package-form" element={<PackageFormPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        </Routes>
      </main>
      <Footer />
      {/* Chat button appears on all pages except the chat page itself */}
      <Routes>
        <Route path="/chat" element={null} />
        <Route path="*" element={<ChatButton />} />
      </Routes>
    </div>
  )
}

export default App