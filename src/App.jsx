// App.jsx
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
import ResetPassword from './pages/auth/ResetPassword.jsx';

// App pages
import Dashboard from './pages/Dashboard.jsx'
import OnboardingWizard from './pages/OnboardingWizard.jsx'
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

function MarketingLayout({ children }) {
  return (
    <>
      <Nav />
      <div className="page">{children}</div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
        <Route path="/features" element={<MarketingLayout><Features /></MarketingLayout>} />
        <Route path="/pricing" element={<MarketingLayout><Pricing /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
        <Route path="/demo" element={<MarketingLayout><Demo /></MarketingLayout>} />

        {/* Auth (public only) */}
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
        <Route path="/reset-password" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


/*

import { useState, useEffect } from "react"
import { supabase } from "./lib/supabase.js";
console.log(supabase)

export default function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	
	async function getUsers() {
		const { data, error, status, statusText } = await supabase
						.schema('acadryx')
						.from('users')
						.select();
		console.log('DATA', data)
		setUsers(data || []);
	}

	return (
		<ul>
			{users && users.map(user => <li key={user.id}>{user.surname + ' ' + user.first_name}</li>)}
		</ul>
	)
}
*/
