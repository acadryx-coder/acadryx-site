// src/pages/school/SchoolPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ProfileAvatar from '../../components/ProfileAvatar'
import OverviewTab from './tabs/OverviewTab'
import AcademicTab from './tabs/AcademicTab'
import UsersTab from './tabs/UsersTab'
import BillingTab from './tabs/BillingTab'
import SettingsTab from './tabs/SettingsTab'
import '../../styles/school.css'

export default function SchoolPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [school, setSchool] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [billingData, setBillingData] = useState(null)
  const [billingError, setBillingError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)

  // Load school data (does NOT load billing)
  async function loadSchoolData() {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      setUser(user)

      // Get account
      const { data: accountData, error: accountError } = await supabase
        .schema('acadryx')
        .from('acadryx_accounts')
        .select('full_name, profile_pic_url')
        .eq('id', user.id)
        .single()
      if (accountError) throw accountError
      setAccount(accountData)

      // Get all schools via RPC
      const { data: schoolsData, error: schoolsError } = await supabase
        .schema('schools')
        .rpc('get_school_dashboard_data', { p_owner_id: user.id })

      if (schoolsError) throw schoolsError

      // Find school by slug
      const foundSchool = schoolsData?.find(s => s.slug === slug)
      if (!foundSchool) throw new Error('School not found')
      setSchool(foundSchool)

      // Set selected branch (main branch or first branch)
      const mainBranch = foundSchool.branches?.find(b => b.is_main) || foundSchool.branches?.[0]
      setSelectedBranch(mainBranch)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Load billing data when selectedBranch changes
  async function loadBillingData(branchId) {
    if (!branchId) return
    
    try {
      const { data: billing, error: billingError } = await supabase
        .schema('billing')
        .rpc('get_branch_billing_data', { p_branch_id: branchId })
      
      if (billingError) {
        setBillingError(billingError.message)
        setBillingData(null)
      } else {
        setBillingData(billing)
        setBillingError(null)
      }
    } catch (err) {
      setBillingError(err.message)
      setBillingData(null)
    }
  }

  // Initial load
  useEffect(() => {
    loadSchoolData()
  }, [slug])

  // Load billing when selectedBranch is set
  useEffect(() => {
    if (selectedBranch) {
      loadBillingData(selectedBranch.branch_id)
    }
  }, [selectedBranch])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="school-shell">
        <div className="school-loading">
          <div className="school-spinner" />
          <p>Loading school data...</p>
        </div>
      </div>
    )
  }

  if (error || !school) {
    return (
      <div className="school-shell">
        <div className="school-alert danger">
          <strong>Error loading school</strong>
          <p>{error || 'School not found'}</p>
          <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="school-shell">
      {/* Top Bar */}
      <div className="school-topbar">
        <div className="school-topbar-left">
          <button className="school-back-btn" onClick={() => navigate('/dashboard')}>
            ← Dashboard
          </button>
          <div className="school-logo-mini">
            {school.logo_url ? (
              <img src={school.logo_url} alt={school.school_name} />
            ) : (
              <span>{school.school_name?.[0] || 'S'}</span>
            )}
          </div>
          <div className="school-title-container">
            <div className="school-title-row">
              <h1 className="school-title">{school.short_name || school.school_name}</h1>
              <div className="branch-selector">
                <button 
                  className="branch-selector-btn"
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                >
                  <span className="branch-icon">🏢</span>
                  <span className="branch-name">{selectedBranch?.branch_name || 'Select branch'}</span>
                  <span className="branch-chevron">▼</span>
                </button>
                {showBranchDropdown && (
                  <div className="branch-dropdown">
                    {school.branches?.map(branch => (
                      <button
                        key={branch.branch_id}
                        className={`branch-option ${selectedBranch?.branch_id === branch.branch_id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedBranch(branch)
                          setShowBranchDropdown(false)
                        }}
                      >
                        <span className="branch-icon">🏢</span>
                        <span className="branch-name">{branch.branch_name}</span>
                        {branch.is_main && <span className="branch-badge">Main</span>}
                        {selectedBranch?.branch_id === branch.branch_id && <span className="branch-check">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="school-slug">acadryx.vercel.app/?{school.slug}</p>
          </div>
        </div>
        <div className="school-topbar-right">
          <ProfileAvatar 
            src={account?.profile_pic_url} 
            name={account?.full_name || user?.email}
            size={40}
          />
          <button className="school-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {/* Balance Bar */}
      {billingError ? (
        <div className="school-balance-bar error">
          <div className="balance-info">
            <span className="balance-label">Balance Unavailable</span>
            <span className="balance-error">⚠️ {billingError}</span>
          </div>
          <button className="balance-retry" onClick={() => loadBillingData(selectedBranch?.branch_id)}>
            Retry
          </button>
        </div>
      ) : billingData ? (
        <div className="school-balance-bar">
          <div className="balance-info">
            <span className="balance-label">Available Balance</span>
            <span className="balance-amount">
              {billingData.currency_symbol || '₦'}{billingData.balance?.toLocaleString() || 0}
            </span>
          </div>
          <button className="balance-topup" onClick={() => setActiveTab('billing')}>
            Top Up →
          </button>
        </div>
      ) : (
        <div className="school-balance-bar loading">
          <div className="balance-info">
            <span className="balance-label">Loading balance...</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="school-nav">
        {['overview', 'academic', 'users', 'billing', 'settings'].map(tab => (
          <button
            key={tab}
            className={`school-nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="school-body">
        {activeTab === 'overview' && (
          <OverviewTab school={school} billingData={billingData} />
        )}
        {activeTab === 'academic' && (
          <AcademicTab schoolId={school.school_id} branchId={selectedBranch?.branch_id} />
        )}
        {activeTab === 'users' && (
          <UsersTab schoolId={school.school_id} branchId={selectedBranch?.branch_id} />
        )}
        {activeTab === 'billing' && (
          <BillingTab 
            billingData={billingData} 
            billingError={billingError}
            schoolId={school.school_id} 
            branchId={selectedBranch?.branch_id}
            currencySymbol={school.country?.currency_symbol}
            onRefresh={() => loadBillingData(selectedBranch?.branch_id)}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTab school={school} onUpdate={loadSchoolData} />
        )}
      </div>
    </div>
  )
}
