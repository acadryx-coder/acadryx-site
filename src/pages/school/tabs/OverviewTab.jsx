// src/pages/school/tabs/OverviewTab.jsx
export default function OverviewTab({ school, billingData }) {
  const mainBranch = school.branches?.find(b => b.is_main) || school.branches?.[0]
  const totalUsers = school.role_counts 
    ? Object.values(school.role_counts).reduce((a, b) => a + b, 0)
    : 0

  return (
    <div className="overview-tab">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{school.branches?.length || 1}</div>
          <div className="stat-label">Branches</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{school.role_counts?.student || 0}</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{school.role_counts?.teacher || 0}</div>
          <div className="stat-label">Teachers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{school.role_counts?.parent || 0}</div>
          <div className="stat-label">Parents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{school.role_counts?.admin || 0}</div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{school.role_counts?.alumni || 0}</div>
          <div className="stat-label">Alumni</div>
        </div>
        <div className="stat-card balance-highlight">
          <div className="stat-value">{school.country?.currency_symbol || '₦'}{billingData?.balance?.toLocaleString() || 0}</div>
          <div className="stat-label">Wallet Balance</div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>School Information</h3>
          <div className="info-row"><span>School Name:</span><strong>{school.school_name}</strong></div>
          {school.short_name && <div className="info-row"><span>Short Name:</span><strong>{school.short_name}</strong></div>}
          <div className="info-row"><span>School Link:</span><strong>{school.slug}.acadryx.com</strong></div>
          <div className="info-row"><span>Country:</span><strong>{school.country?.name}</strong></div>
          {school.address && <div className="info-row"><span>Address:</span><strong>{school.address}</strong></div>}
          {school.city && <div className="info-row"><span>City:</span><strong>{school.city}</strong></div>}
          {school.state && <div className="info-row"><span>State:</span><strong>{school.state}</strong></div>}
          <div className="info-row"><span>Contact:</span><strong>{school.contact_email}</strong></div>
          {school.contact_phone && <div className="info-row"><span>Phone:</span><strong>{school.contact_phone}</strong></div>}
          <div className="info-row"><span>Main Branch:</span><strong>{mainBranch?.branch_name || 'MAIN'}</strong></div>
        </div>

        <div className="info-card">
          <h3>Academic & Status</h3>
          <div className="info-row">
            <span>Brand Color:</span>
            <div className="color-display">
              <div className="color-swatch" style={{ backgroundColor: school.brand_color }} />
              <strong>{school.brand_color}</strong>
            </div>
          </div>
          <div className="info-row">
            <span>Status:</span>
            <span className={`status-badge ${school.is_active ? 'active' : 'inactive'}`}>
              {school.is_active ? 'Active' : 'Suspended'}
            </span>
          </div>
          <div className="info-row"><span>Total Users:</span><strong>{totalUsers}</strong></div>
          <div className="info-row"><span>Created:</span><strong>{new Date(school.created_at).toLocaleDateString()}</strong></div>
        </div>
      </div>
    </div>
  )
}