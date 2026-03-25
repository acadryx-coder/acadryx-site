// src/components/SchoolCard.jsx
import { useNavigate } from 'react-router-dom'
import ProfileAvatar from './ProfileAvatar'

export default function SchoolCard({ school }) {
  const navigate = useNavigate()
  
  const totalUsers = school.role_counts 
    ? Object.values(school.role_counts).reduce((a, b) => a + b, 0)
    : 0

  const location = school.city || school.address ? `${school.city || ''}${school.city && school.state ? ', ' : ''}${school.state || ''}` : null

  return (
    <div className={`school-card ${!school.is_active ? 'suspended' : ''}`}>
      <div className="school-card-header">
        <div className="school-header-left">
          <ProfileAvatar 
            src={school.logo_url} 
            name={school.school_name}
            size={48}
          />
          <div className="school-title">
            <h3 className="school-name">{school.school_name}</h3>
            {location && <p className="school-location">{location}</p>}
          </div>
        </div>
        <span className={`school-status-badge ${school.is_active ? 'active' : 'suspended'}`}>
          {school.is_active ? 'Active' : 'Suspended'}
        </span>
      </div>

      <div className="school-stats-grid">
        <div className="stat-item">
          <div className="stat-number">{school.role_counts?.student || 0}</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{school.role_counts?.teacher || 0}</div>
          <div className="stat-label">Teachers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{school.role_counts?.parent || 0}</div>
          <div className="stat-label">Parents</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{school.role_counts?.admin || 0}</div>
          <div className="stat-label">Admins</div>
        </div>
      </div>

      <div className="school-secondary-stats">
        <span>🎓 Alumni: {school.role_counts?.alumni || 0}</span>
        <span>🏢 Branches: {school.branch_count || 1}</span>
        <span className="wallet-balance">
          {school.country?.currency_symbol || '₦'}{school.wallet_balance?.toLocaleString() || 0}
        </span>
      </div>

      <div className="school-card-actions">
        <button 
          className="manage-btn"
          onClick={() => navigate(`/school/${school.slug}`)}
        >
          Manage School →
        </button>
        <button className="topup-btn-small">Top Up</button>
      </div>
    </div>
  )
}