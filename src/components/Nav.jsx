// Nav.jsx — auth-aware
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">Acadryx</Link>

            {/* Desktop links */}
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/features" className={({ isActive }) => isActive ? 'active' : ''}>Features</NavLink>
              <NavLink to="/pricing" className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink>
              <NavLink to="/demo" className={({ isActive }) => isActive ? 'active' : ''}>Demo</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>

              {session ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `nav-cta${isActive ? ' active' : ''}`}
                  >
                    Dashboard →
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Log in</NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => `nav-cta${isActive ? ' active' : ''}`}
                  >
                    Get started
                  </NavLink>
                </>
              )}
            </div>

            {/* Hamburger */}
            <div className="ham" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/demo">Demo</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {session ? (
          <>
            <NavLink to="/dashboard" style={{ color: 'var(--teal)' }}>Dashboard →</NavLink>
            <button
              onClick={handleLogout}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,.55)',
                fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500,
                padding: '14px 0', textAlign: 'left', cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,.06)',
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup" style={{ color: 'var(--teal)' }}>Get started →</NavLink>
          </>
        )}
      </div>
    </>
  )
}
