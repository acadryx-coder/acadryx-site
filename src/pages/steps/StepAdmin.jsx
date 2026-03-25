// steps/StepAdmin.jsx
import { useState } from 'react'

export default function StepAdmin({ data, updateData, back, next }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case 'adminFirstName':
        if (!value?.trim()) return 'First name is required'
        return null
      case 'adminSurname':
        if (!value?.trim()) return 'Surname is required'
        return null
      case 'adminEmail':
        if (!value?.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address'
        return null
      default:
        return null
    }
  }

  const handleChange = (field, value) => {
    updateData({ [field]: value })
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, data[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const isStepValid = () => {
    const fields = ['adminFirstName', 'adminSurname', 'adminEmail']
    let valid = true
    fields.forEach(f => {
      const error = validateField(f, data[f])
      if (error) {
        setErrors(prev => ({ ...prev, [f]: error }))
        valid = false
      } else {
        setErrors(prev => ({ ...prev, [f]: null }))
      }
    })
    return valid
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (isStepValid()) next()
  }

  return (
    <form onSubmit={handleNext} className="step-form">
      <div className="step-header">
        <span className="step-number">Step 4 of 5</span>
        <h2>Admin account</h2>
        <p>This will be the primary admin for your school. They will receive a login code to access the school portal.</p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>First Name *</label>
          <input
            type="text"
            value={data.adminFirstName}
            onChange={(e) => handleChange('adminFirstName', e.target.value)}
            onBlur={() => handleBlur('adminFirstName')}
            placeholder="John"
          />
          {touched.adminFirstName && errors.adminFirstName && (
            <div className="field-error">{errors.adminFirstName}</div>
          )}
        </div>

        <div className="form-field">
          <label>Surname *</label>
          <input
            type="text"
            value={data.adminSurname}
            onChange={(e) => handleChange('adminSurname', e.target.value)}
            onBlur={() => handleBlur('adminSurname')}
            placeholder="Doe"
          />
          {touched.adminSurname && errors.adminSurname && (
            <div className="field-error">{errors.adminSurname}</div>
          )}
        </div>

        <div className="form-field">
          <label>Email *</label>
          <input
            type="email"
            value={data.adminEmail}
            onChange={(e) => handleChange('adminEmail', e.target.value)}
            onBlur={() => handleBlur('adminEmail')}
            placeholder="admin@school.com"
          />
          {touched.adminEmail && errors.adminEmail && (
            <div className="field-error">{errors.adminEmail}</div>
          )}
          <small>This email is used for communication and account recovery.</small>
        </div>

        <div className="form-field">
          <label>Phone (Optional)</label>
          <input
            type="tel"
            value={data.adminPhone}
            onChange={(e) => handleChange('adminPhone', e.target.value)}
            placeholder="+234 801 234 5678"
          />
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button type="submit" className="btn-primary">Continue →</button>
      </div>
    </form>
  )
}
