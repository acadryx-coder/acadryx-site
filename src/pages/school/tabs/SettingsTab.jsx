// src/pages/school/tabs/SettingsTab.jsx
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function SettingsTab({ school, onUpdate }) {
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
    </div>
  )
}