// Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/dashboard.css'
import SchoolCard from "../components/SchoolCard.jsx"
import ProfileAvatar from '../components/ProfileAvatar.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)
  const [schools, setSchools] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      setLoading(true)
      setError(null)

      // 1. Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      setUser(user)
	  // 2. After getting user, Get account
	  const { data: accountData, error: accountError } = await supabase
	    .schema('acadryx')
	    .from('acadryx_accounts')
	    .select('full_name, profile_pic_url')
	    .eq('id', user.id)
	    .single()
	  
	  if (accountError) throw accountError
	  setAccount(accountData)
console.log(accountData)
      // 3. Get school dashboard data using our function
      const { data, error: schoolsError } = await supabase
        .schema('schools')
        .rpc('get_school_dashboard_data', { p_owner_id: user.id })

      if (schoolsError) throw schoolsError
      setSchools(data || [])
console.log(data)
    } catch (err) {
      if(err.message === "Failed to fetch") {
      	err.message = "No Internet Connection"
      }
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="dash-shell">
        <div className="dash-loading">
          <div className="dash-spinner" />
          <p>Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dash-shell">
        <div className="dash-alert danger">
          <strong>Error loading dashboard</strong>
          <p>{error}</p>
          <button onClick={loadDashboard}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dash-shell">
      {/* Top Bar */}
      <div className="dash-topbar">
        <div className="dash-logo" onClick={() => navigate('/')}>
          Acadryx
        </div>
        <div className="dash-topbar-right">
          <ProfileAvatar 
            src={account?.profile_pic_url} 
            name={account?.full_name || user?.email}
            size={44}
          />
          <span className="user-email">{user?.email}</span>
          <button className="dash-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-body">
        <div className="dash-header">
          <div>
            <h1>Your Schools</h1>
            <p>{schools.length} school{schools.length !== 1 ? 's' : ''}</p>
          </div>
          <button 
            className={schools.length === 0 ? "dash-create-btn" : "dash-create-btn-secondary"}
            onClick={() => navigate('/onboarding')}
          >
            + Create School
          </button>
        </div>

        {schools.length === 0 ? (
          <div className="dash-empty">
            <div className="empty-icon">🏫</div>
            <h3>No schools yet</h3>
            <p>Create your first school to get started</p>
          </div>
        ) : (
          <div className="schools-grid">
            {schools.map((school) => (
              <SchoolCard key={school.school_id} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
