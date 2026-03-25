// steps/StepSchoolInfo.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function StepSchoolInfo({
  data,
  updateData,
  countries,
  checkSlugAvailability,
  next
}) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [checkingSlug, setCheckingSlug] = useState(false)

  // Slug availability debounce
  useEffect(() => {
    if (!data.slug || data.slug.length < 3 || data.slugAvailable !== null) return
    const timer = setTimeout(() => {
      setCheckingSlug(true)
      checkSlugAvailability(data.slug).finally(() => setCheckingSlug(false))
    }, 500)
    return () => clearTimeout(timer)
  }, [data.slug, data.slugAvailable, checkSlugAvailability])

  const validateField = (name, value) => {
    switch (name) {
      case 'schoolName':
        if (!value?.trim()) return 'School name is required'
        return null
      case 'slug':
        if (!value?.trim()) return 'School link is required'
        if (value.length < 3) return 'At least 3 characters'
        if (!/^[a-z0-9-]+$/.test(value)) return 'Only lowercase letters, numbers, and hyphens'
        if (data.slugAvailable === false) return 'This link is already taken'
        return null
      case 'contactEmail':
        if (!value?.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address'
        return null
      case 'countryId':
        if (!value) return 'Please select your country'
        return null
      default:
        return null
    }
  }

  const handleChange = (field, value) => {
    updateData({ [field]: value })
    if(field === "countryId") {
    	updateData({
    		selectedSections: [],
    	})
    };
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
    const fields = ['schoolName', 'slug', 'contactEmail', 'countryId']
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
    return valid && data.slugAvailable === true
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (isStepValid()) next()
  }

  return (
    <form onSubmit={handleNext} className="step-form">
      <div className="step-header">
        <span className="step-number">Step 1 of 5</span>
        <h2>Tell us about your school</h2>
        <p>This information will be displayed throughout your school app.</p>
      </div>

      <div className="form-grid">
        <div className="form-field full">
          <label>School Name *</label>
          <input
            type="text"
            value={data.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            onBlur={() => handleBlur('schoolName')}
            placeholder="e.g., Greenfield Academy"
          />
          {touched.schoolName && errors.schoolName && (
            <div className="field-error">{errors.schoolName}</div>
          )}
        </div>

        <div className="form-field">
          <label>Short Name / Abbreviation</label>
          <input
            type="text"
            value={data.shortName}
            onChange={(e) => handleChange('shortName', e.target.value)}
            placeholder="e.g., GFA"
          />
          <small>Used in tight spaces like result slips</small>
        </div>

        <div className="form-field">
          <label>School Link (Slug) *</label>
          <div className="slug-input-group">
            <input
              type="text"
              value={data.slug}
              onChange={(e) => {
                const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                console.log(data)
                data.slugAvailable = null;
                handleChange('slug', val)
              }}
              onBlur={() => handleBlur('slug')}
              placeholder="yourschool"
            />
            <span className="slug-domain">.acadryx.app</span>
          </div>
          {touched.slug && (
            <>
              {checkingSlug && <div className="slug-checking">Checking availability...</div>}
              {!checkingSlug && data.slugAvailable === true && (
                <div className="slug-available">✓ Available</div>
              )}
              {!checkingSlug && data.slugAvailable === false && (
                <div className="slug-unavailable">✗ Already taken</div>
              )}
              {errors.slug && <div className="field-error">{errors.slug}</div>}
            </>
          )}
          <small>{"Only lowercase letters, numbers, and hyphens. This becomes your school's unique address."}</small>
        </div>

        <div className="form-field">
          <label>Country *</label>
          <select
            value={data.countryId}
            onChange={(e) => handleChange('countryId', e.target.value)}
            onBlur={() => handleBlur('countryId')}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {touched.countryId && errors.countryId && (
            <div className="field-error">{errors.countryId}</div>
          )}
        </div>

        <div className="form-field">
          <label>Main Branch Name</label>
          <input
            type="text"
            value={data.branchName}
            onChange={(e) => handleChange('branchName', e.target.value)}
            placeholder="MAIN"
          />
          <small>You can add more branches later from your dashboard</small>
        </div>

        <div className="form-field full">
          <label>Address</label>
          <textarea
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Street address"
            rows={2}
          />
        </div>

        <div className="form-field">
          <label>City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="City"
          />
        </div>

        <div className="form-field">
          <label>State / Province</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder="State"
          />
        </div>

        <div className="form-field">
          <label>Contact Email *</label>
          <input
            type="email"
            value={data.contactEmail}
            onChange={(e) => handleChange('contactEmail', e.target.value)}
            onBlur={() => handleBlur('contactEmail')}
            placeholder="info@yourschool.com"
          />
          {touched.contactEmail && errors.contactEmail && (
            <div className="field-error">{errors.contactEmail}</div>
          )}
        </div>

        <div className="form-field">
          <label>Contact Phone</label>
          <input
            type="tel"
            value={data.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="+234 806 000 0000"
          />
        </div>

        <div className="form-field">
          <label>Brand Colour</label>
          <div className="color-picker">
            <input
              type="color"
              value={data.brandColor}
              onChange={(e) => handleChange('brandColor', e.target.value)}
            />
            <span>{data.brandColor}</span>
          </div>
          <small>It is recommended you use dark colors. Used throughout your school app</small>
        </div>
      </div>

      <div className="step-actions">
        <button type="submit" className="btn-primary">Continue →</button>
      </div>
    </form>
  )
}
