// App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { countriesMap } from './config/countries'

// Marketing pages
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Features from './pages/Features.jsx'
import Pricing from './pages/Pricing.jsx'
import Contact from './pages/Contact.jsx'
import Demo from './pages/Demo.jsx'

// Auth pages
import SignupPage from './pages/auth/SignupPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx';

// App pages
import Dashboard from './pages/Dashboard.jsx'
import OnboardingWizard from './pages/OnboardingWizard.jsx'
import SchoolPage from './pages/school/SchoolPage.jsx'
import NotFound from './pages/NotFound.jsx'

function useSession() {
  const [session, setSession] = useState(undefined) // undefined = loading
  useEffect(() => {
    supabase.auth.getSession().then(response => {
      setSession(response.data.session);
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    })
    return () => subscription.unsubscribe()
  }, [])
  return session;
}

function ProtectedRoute({ children }) {
  const session = useSession()
  if (session === undefined) return <div style={{ minHeight: '100vh', background: '#060d1f' }} />
  return session ? children : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }) {
  const session = useSession()
  if (session === undefined) return <div style={{ minHeight: '100vh', color: 'white', background: '#060d1f' }} />
  return !session ? children : <Navigate to="/dashboard" replace />
}

function MarketingLayout({ children, selectedCountry, onCountryChange }) {
  return (
    <>
      <Nav selectedCountry={selectedCountry} onCountryChange={onCountryChange} />
      <div className="page">{children}</div>
    </>
  )
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loadingCountry, setLoadingCountry] = useState(true)

  // Detect country on mount
  useEffect(() => {
    const detectCountry = async () => {
      // Check localStorage first
      const saved = localStorage.getItem('selectedCountry')
      if (saved) {
        try {
          setSelectedCountry(JSON.parse(saved))
          setLoadingCountry(false)
          return
        } catch (e) {
          // Invalid JSON, continue with detection
        }
      }

      try {
        // Detect by IP
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        const countryCode = data.country_code || 'NG'
        
        // Map to your country object
        const country = countriesMap[countryCode] || countriesMap['NG']
        setSelectedCountry(country)
        localStorage.setItem('selectedCountry', JSON.stringify(country))
      } catch (err) {
        // Fallback to Nigeria
        setSelectedCountry(countriesMap['NG'])
        localStorage.setItem('selectedCountry', JSON.stringify(countriesMap['NG']))
      } finally {
        setLoadingCountry(false)
      }
    }

    detectCountry()
  }, [])

  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    localStorage.setItem('selectedCountry', JSON.stringify(country))
  }

  // Show nothing while detecting country (prevents flash)
  if (loadingCountry) {
    return <div style={{ minHeight: '100vh', background: '#060d1f' }} />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing */}
        <Route path="/" element={
          <MarketingLayout selectedCountry={selectedCountry} onCountryChange={handleCountryChange}>
            <Home selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/features" element={
          <MarketingLayout selectedCountry={selectedCountry} onCountryChange={handleCountryChange}>
            <Features selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/pricing" element={
          <MarketingLayout selectedCountry={selectedCountry} onCountryChange={handleCountryChange}>
            <Pricing selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/contact" element={
          <MarketingLayout selectedCountry={selectedCountry} onCountryChange={handleCountryChange}>
            <Contact />
          </MarketingLayout>
        } />
        <Route path="/demo" element={
          <MarketingLayout selectedCountry={selectedCountry} onCountryChange={handleCountryChange}>
            <Demo />
          </MarketingLayout>
        } />

        {/* Auth (public only) */}
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
        <Route path="/reset-password" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />
        <Route path="/school/:slug" element={<ProtectedRoute><SchoolPage /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
