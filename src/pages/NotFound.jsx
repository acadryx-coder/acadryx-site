// NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      gap: '20px',
    }}>
      <div style={{ fontSize: '5rem', lineHeight: 1 }}>404</div>
      <h1 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', margin: 0 }}>
        Page not found
      </h1>
      <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.95rem', maxWidth: 380, lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-white">← Go Home</Link>
        <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
      </div>
    </div>
  )
}
