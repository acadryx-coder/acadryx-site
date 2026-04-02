// src/App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

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
import ResetPassword from './pages/auth/ResetPassword.jsx'

// App pages
import Dashboard from './pages/Dashboard.jsx'
import OnboardingWizard from './pages/OnboardingWizard.jsx'
import SchoolPage from './pages/school/SchoolPage.jsx'
import NotFound from './pages/NotFound.jsx'

function useSession() {
  const [session, setSession] = useState(undefined)
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
  if (session === undefined) return <div style={{ minHeight: '100vh', background: '#060d1f' }} />
  return !session ? children : <Navigate to="/dashboard" replace />
}

function MarketingLayout({ children, selectedCountry, onCountryChange, countriesList }) {
  return (
    <>
      <Nav 
        selectedCountry={selectedCountry} 
        onCountryChange={onCountryChange}
        countriesList={countriesList}
      />
      <div className="page">{children}</div>
    </>
  )
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesList, setCountriesList] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(true)

  /* RETURNS { array of: { id: uuid, code: string, name: string, flag: string, currency: string, currency_symbol: string, price_per_student: number } } */
  async function loadCountriesFromDB() {
    const { data, error } = await supabase
      .schema('acadryx')
      .rpc('get_countries_with_core_pricing')
    
    if (error) {
      console.error('Failed to load countries:', error)
      return []
    }
    return data || []
  }

  /* RETURNS { country_code: string } or null on error */
  async function detectCountryByIP() {
    try {
      const res = await fetch('https://ipapi.co/json/')
      const data = await res.json()
      return data.country_code || 'NG'
    } catch (err) {
      console.error('IP detection failed:', err)
      return 'NG'
    }
  }

  useEffect(() => {
    async function initCountry() {
      // 1. Check localStorage first
      const saved = localStorage.getItem('selectedCountry')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSelectedCountry(parsed)
        } catch (e) {
          // Invalid JSON, continue with detection
        }
      }
      
      // 2. Load countries from DB
      const countries = await loadCountriesFromDB()
      setCountriesList(countries)
      
      if (countries.length === 0) {
        setLoadingCountries(false)
        return
      }
      
      // 3. If no saved country, detect by IP
      if (!selectedCountry) {
        const detectedCode = await detectCountryByIP()
        const matched = countries.find(c => c.code === detectedCode) || countries.find(c => c.code === 'NG') || countries[0]
        setSelectedCountry(matched)
        localStorage.setItem('selectedCountry', JSON.stringify(matched))
      }
      
      setLoadingCountries(false)
    }
    
    initCountry()
  }, [])

  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    localStorage.setItem('selectedCountry', JSON.stringify(country))
  }

  // Show nothing while detecting country
  if (loadingCountries) {
    return <div style={{ minHeight: '100vh', background: '#060d1f' }} />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing */}
        <Route path="/" element={
          <MarketingLayout 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            countriesList={countriesList}
          >
            <Home selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/features" element={
          <MarketingLayout 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            countriesList={countriesList}
          >
            <Features selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/pricing" element={
          <MarketingLayout 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            countriesList={countriesList}
          >
            <Pricing selectedCountry={selectedCountry} />
          </MarketingLayout>
        } />
        <Route path="/contact" element={
          <MarketingLayout 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            countriesList={countriesList}
          >
            <Contact />
          </MarketingLayout>
        } />
        <Route path="/demo" element={
          <MarketingLayout 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            countriesList={countriesList}
          >
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
