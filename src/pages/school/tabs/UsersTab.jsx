// src/pages/school/tabs/UsersTab.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function UsersTab({ schoolId, branchId }) {
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    loadUsers()
    loadRoles()
  }, [schoolId])

  useEffect(() => {
    let filtered = [...profiles]
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.first_name?.toLowerCase().includes(query) ||
        p.surname?.toLowerCase().includes(query) ||
        `${p.first_name} ${p.surname}`.toLowerCase().includes(query)
      )
    }
    
    if (selectedRole) {
      filtered = filtered.filter(p => p.role_id === selectedRole)
    }
    
    setFilteredProfiles(filtered)
  }, [searchQuery, selectedRole, profiles])

  async function loadUsers() {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .schema('schools')
        .from('profiles')
        .select('id, first_name, surname, email, phone, status, is_active, role_id')
        .eq('school_id', schoolId)
      
      if (profilesError) throw profilesError
      
      const { data: rolesData, error: rolesError } = await supabase
        .schema('acadryx')
        .from('roles')
        .select('id, name')
      
      if (rolesError) throw rolesError
      
      const roleMap = {}
      rolesData?.forEach(role => {
        roleMap[role.id] = role.name
      })
      
      const profilesWithRoles = profilesData?.map(profile => ({
        ...profile,
        role_name: roleMap[profile.role_id] || 'Unknown'
      })) || []
      
      setProfiles(profilesWithRoles)
      
    } catch (err) {
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }
      
  async function loadRoles() {
    const { data } = await supabase
      .schema('acadryx')
      .from('roles')
      .select('id, name')
    setRoles(data || [])
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedRole('')
  }

  if (loading) return <div className="loading-placeholder">Loading users...</div>

  return (
    <div className="users-tab">
      <div className="users-header">
        <h2>Users</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="users-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
        
        <div className="filter-box">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        
        {(searchQuery || selectedRole) && (
          <button className="clear-filters" onClick={handleClearFilters}>
            Clear
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="users-count">
        {filteredProfiles.length} user{filteredProfiles.length !== 1 ? 's' : ''}
        {(searchQuery || selectedRole) && (
          <span className="filtered-badge">filtered</span>
        )}
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              filteredProfiles.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.first_name} {p.surname}</strong></td>
                  <td><span className="role-badge">{p.role_name || '—'}</span></td>
                  <td>{p.email || '—'}</td>
                  <td>{p.phone || '—'}</td>
                  <td>
                    <span className={`status-badge ${p.is_active ? 'active' : 'inactive'}`}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
