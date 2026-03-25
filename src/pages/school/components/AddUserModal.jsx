// src/pages/school/components/AddUserModal.jsx
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AddUserModal({ schoolId, branchId, roles, onClose, onSuccess }) {
  const [form, setForm] = useState({
    first_name: '',
    surname: '',
    email: '',
    phone: '',
    role_id: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.first_name || !form.surname || !form.role_id) {
      setError('Please fill all required fields')
      return
    }

    setLoading(true)
    setError(null)

    const role = roles.find(r => r.id === form.role_id)
    const { data, error: rpcError } = await supabase
      .schema('schools')
      .rpc('add_user', {
        p_school_id: schoolId,
        p_school_branch_id: branchId,
        p_role_name: role?.name,
        p_first_name: form.first_name,
        p_surname: form.surname,
        p_email: form.email || null,
        p_phone: form.phone || null
      })

    if (rpcError) {
      setError(rpcError.message)
    } else if (data?.success) {
      onSuccess(data.login_code)
    } else {
      setError(data?.error || 'Failed to create user')
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New User</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Surname *</label>
              <input
                type="text"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Role *</label>
              <select
                value={form.role_id}
                onChange={(e) => setForm({ ...form, role_id: e.target.value })}
                required
              >
                <option value="">Select role</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}