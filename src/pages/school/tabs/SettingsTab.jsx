// src/pages/school/tabs/SettingsTab.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

export default function SettingsTab({ school, onUpdate }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    school_name: school.school_name,
    short_name: school.short_name || '',
    address: school.address || '',
    city: school.city || '',
    state: school.state || '',
    contact_email: school.contact_email,
    contact_phone: school.contact_phone || '',
    brand_color: school.brand_color,
    logo_url: school.logo_url || ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  
  // Delete school state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    
    const { error: updateError } = await supabase
      .schema('schools')
      .from('schools')
      .update({
        school_name: form.school_name,
        short_name: form.short_name || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        brand_color: form.brand_color,
        logo_url: form.logo_url || null
      })
      .eq('id', school.school_id)
    
    if (updateError) {
      setError(updateError.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      onUpdate()
    }
    setSaving(false)
  }

  const handleDeleteSchool = async () => {
    if (confirmText !== school.school_name) {
      setDeleteError('School name does not match')
      return
    }

    setDeleting(true)
    setDeleteError(null)

    // First, get all branch IDs for this school
    const { data: branches, error: branchesError } = await supabase
      .schema('schools')
      .from('school_branches')
      .select('id')
      .eq('school_id', school.school_id)

    if (branchesError) {
      setDeleteError(branchesError.message)
      setDeleting(false)
      return
    }

    const branchIds = branches.map(b => b.id)

    // Delete in correct order to respect foreign key constraints
    // 1. Delete school_country_features (branch-level)
    if (branchIds.length > 0) {
      const { error: scfError } = await supabase
        .schema('features')
        .from('school_country_features')
        .delete()
        .in('school_branch_id', branchIds)
      
      if (scfError) {
        console.error('Error deleting school_country_features:', scfError)
        // Continue anyway - may not exist
      }
    }

    // 2. Delete setup_progress (branch-level)
    if (branchIds.length > 0) {
      const { error: spError } = await supabase
        .schema('schools')
        .from('setup_progress')
        .delete()
        .in('school_branch_id', branchIds)
      
      if (spError) {
        console.error('Error deleting setup_progress:', spError)
      }
    }

    // 3. Delete login_tokens (profile-level, but belongs to school)
    const { error: ltError } = await supabase
      .schema('schools')
      .from('login_tokens')
      .delete()
      .eq('school_id', school.school_id)
    
    if (ltError) console.error('Error deleting login_tokens:', ltError)

    // 4. Delete parent_student_links
    const { error: pslError } = await supabase
      .schema('schools')
      .from('parent_student_links')
      .delete()
      .eq('school_id', school.school_id)
    
    if (pslError) console.error('Error deleting parent_student_links:', pslError)

    // 5. Delete student_enrollments
    const { error: seError } = await supabase
      .schema('schools')
      .from('student_enrollments')
      .delete()
      .eq('school_id', school.school_id)
    
    if (seError) console.error('Error deleting student_enrollments:', seError)

    // 6. Delete student_subjects
    const { error: ssError } = await supabase
      .schema('schools')
      .from('student_subjects')
      .delete()
      .eq('school_id', school.school_id)
    
    if (ssError) console.error('Error deleting student_subjects:', ssError)

    // 7. Delete result_scores
    const { error: rsError } = await supabase
      .schema('results')
      .from('result_scores')
      .delete()
      .eq('school_id', school.school_id)
    
    if (rsError) console.error('Error deleting result_scores:', rsError)

    // 8. Delete published_scores
    const { error: psError } = await supabase
      .schema('results')
      .from('published_scores')
      .delete()
      .eq('school_id', school.school_id)
    
    if (psError) console.error('Error deleting published_scores:', psError)

    // 9. Delete results
    const { error: rError } = await supabase
      .schema('results')
      .from('results')
      .delete()
      .eq('school_id', school.school_id)
    
    if (rError) console.error('Error deleting results:', rError)

    // 10. Delete grade_scales
    const { error: gsError } = await supabase
      .schema('results')
      .from('grade_scales')
      .delete()
      .eq('school_id', school.school_id)
    
    if (gsError) console.error('Error deleting grade_scales:', gsError)

    // 11. Delete term_assessments
    const { error: taError } = await supabase
      .schema('results')
      .from('term_assessments')
      .delete()
      .eq('school_id', school.school_id)
    
    if (taError) console.error('Error deleting term_assessments:', taError)

    // 12. Delete section_subjects
    const { error: secSubError } = await supabase
      .schema('schools')
      .from('section_subjects')
      .delete()
      .eq('school_id', school.school_id)
    
    if (secSubError) console.error('Error deleting section_subjects:', secSubError)

    // 13. Delete school_class_arms
    const { error: armsError } = await supabase
      .schema('schools')
      .from('school_class_arms')
      .delete()
      .eq('school_id', school.school_id)
    
    if (armsError) console.error('Error deleting school_class_arms:', armsError)

    // 14. Delete school_classes
    const { error: classesError } = await supabase
      .schema('schools')
      .from('school_classes')
      .delete()
      .eq('school_id', school.school_id)
    
    if (classesError) console.error('Error deleting school_classes:', classesError)

    // 15. Delete school_sections
    const { error: sectionsError } = await supabase
      .schema('schools')
      .from('school_sections')
      .delete()
      .eq('school_id', school.school_id)
    
    if (sectionsError) console.error('Error deleting school_sections:', sectionsError)

    // 16. Delete school_branches
    if (branchIds.length > 0) {
      const { error: branchesDelError } = await supabase
        .schema('schools')
        .from('school_branches')
        .delete()
        .in('id', branchIds)
      
      if (branchesDelError) console.error('Error deleting school_branches:', branchesDelError)
    }

    // 17. Delete academic_terms
    const { error: termsError } = await supabase
      .schema('schools')
      .from('academic_terms')
      .delete()
      .eq('school_id', school.school_id)
    
    if (termsError) console.error('Error deleting academic_terms:', termsError)

    // 18. Delete academic_sessions
    const { error: sessionsError } = await supabase
      .schema('schools')
      .from('academic_sessions')
      .delete()
      .eq('school_id', school.school_id)
    
    if (sessionsError) console.error('Error deleting academic_sessions:', sessionsError)

    // 19. Delete billing.school_termly_wallets
    if (branchIds.length > 0) {
      const { error: walletError } = await supabase
        .schema('billing')
        .from('school_termly_wallets')
        .delete()
        .in('school_branch_id', branchIds)
      
      if (walletError) console.error('Error deleting school_termly_wallets:', walletError)
    }

    // 20. Delete billing.deposits
    if (branchIds.length > 0) {
      const { error: depositsError } = await supabase
        .schema('billing')
        .from('deposits')
        .delete()
        .in('school_branch_id', branchIds)
      
      if (depositsError) console.error('Error deleting deposits:', depositsError)
    }

    // 21. Finally, delete the school itself
    const { error: schoolError } = await supabase
      .schema('schools')
      .from('schools')
      .delete()
      .eq('id', school.school_id)

    if (schoolError) {
      setDeleteError(schoolError.message)
      setDeleting(false)
      return
    }

    // Success - redirect to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="settings-tab">
      <div className="settings-grid">
        <div className="settings-field full">
          <label>School Name</label>
          <input 
            value={form.school_name} 
            onChange={(e) => handleChange('school_name', e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>Short Name</label>
          <input 
            value={form.short_name} 
            onChange={(e) => handleChange('short_name', e.target.value)}
            placeholder="e.g., DIS"
          />
        </div>

        <div className="settings-field">
          <label>Brand Color</label>
          <div className="color-field">
            <input 
              type="color" 
              value={form.brand_color} 
              onChange={(e) => handleChange('brand_color', e.target.value)}
            />
            <span>{form.brand_color}</span>
          </div>
        </div>

        <div className="settings-field full">
          <label>Logo URL</label>
          <input 
            value={form.logo_url} 
            onChange={(e) => handleChange('logo_url', e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="settings-field full">
          <label>Address</label>
          <input 
            value={form.address} 
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>City</label>
          <input 
            value={form.city} 
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>State</label>
          <input 
            value={form.state} 
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>Contact Email</label>
          <input 
            type="email"
            value={form.contact_email} 
            onChange={(e) => handleChange('contact_email', e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>Contact Phone</label>
          <input 
            value={form.contact_phone} 
            onChange={(e) => handleChange('contact_phone', e.target.value)}
          />
        </div>
      </div>

      {error && <div className="settings-error">{error}</div>}
      
      <div className="settings-actions">
        {saved && <span className="settings-saved">✓ Saved</span>}
        <button 
          className="btn-primary" 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Delete School Section */}
      <div style={{ 
        marginTop: '48px', 
        paddingTop: '32px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
      }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: '#f87171',
          marginBottom: '8px'
        }}>
          Danger Zone
        </h3>
        <p style={{ 
          fontSize: '13px', 
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '16px'
        }}>
          Once you delete a school, all associated data (students, teachers, results, billing) will be permanently removed. This action cannot be undone.
        </p>
        <button 
          className="btn-danger" 
          onClick={() => setShowDeleteModal(true)}
          style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#f87171',
            padding: '10px 20px',
            borderRadius: '40px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.25)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.15)'
          }}
        >
          Delete School
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#f87171' }}>Delete School</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
                You are about to delete <strong>{school.school_name}</strong>. This will permanently remove:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '20px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}>
                <li>All students, teachers, parents, and alumni profiles</li>
                <li>All class structures and subject enrolments</li>
                <li>All scores and published results</li>
                <li>All billing history and wallet balances</li>
                <li>All login codes and access tokens</li>
              </ul>
              <p style={{ marginBottom: '16px', color: '#f87171', fontSize: '13px' }}>
                This action cannot be undone.
              </p>
              <div className="form-group">
                <label style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Type <strong>{school.school_name}</strong> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={school.school_name}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: '#fff'
                  }}
                />
              </div>
              {deleteError && (
                <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>
                  {deleteError}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={handleDeleteSchool} 
                disabled={deleting || confirmText !== school.school_name}
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '40px',
                  fontWeight: 600,
                  cursor: confirmText === school.school_name ? 'pointer' : 'not-allowed',
                  opacity: confirmText === school.school_name ? 1 : 0.5
                }}
              >
                {deleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
