// src/pages/school/tabs/BranchesTab.jsx
import { useNavigate, useParams } from 'react-router-dom'

export default function BranchesTab({ schoolId, branches }) {
  const navigate = useNavigate()
  const { slug } = useParams()

  return (
    <div className="branches-tab">
      <div className="academic-header">
        <h2>Branches</h2>
        <button 
          className="btn-primary-sm"
          onClick={() => navigate(`/school/${slug}/branches/new`)}
        >
          + New Branch
        </button>
      </div>
      
      {branches && branches.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, marginBottom: 12, color: 'rgba(255,255,255,0.6)' }}>
            Current Branches ({branches.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {branches.map(branch => (
              <div 
                key={branch.branch_id} 
                className="info-card"
                style={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 , color: 'rgb(200, 200, 200)'}}>
                      {branch.branch_name}
                      {branch.is_main && (
                        <span className="status-badge active" style={{ fontSize: 10 }}>
                          Main
                        </span>
                      )}
                    </div>
                    {branch.active_term_name && (
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                        📅 {branch.active_term_name} · {branch.active_session_name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(!branches || branches.length === 0) && (
        <div className="info-card" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
            No Branches Yet
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            Create your first additional branch to get started.
          </div>
        </div>
      )}
    </div>
  );
}
