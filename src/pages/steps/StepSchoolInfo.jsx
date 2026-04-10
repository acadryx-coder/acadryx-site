// steps/StepSchoolInfo.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// Nigerian states list (can be moved to a config file later)
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
]

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
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [selectedCountryPrice, setSelectedCountryPrice] = useState(null)
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [showStateField, setShowStateField] = useState(false)

  // Check if selected country is Nigeria (code 'NG')
  useEffect(() => {
    const selectedCountry = countries.find(c => c.id === data.countryId)
    setShowStateField(selectedCountry?.code === 'NG')
  }, [data.countryId, countries])

  // Slug availability debounce
  useEffect(() => {
    if (!data.slug || data.slug.length < 3 || data.slugAvailable !== null) return
    const timer = setTimeout(() => {
      setCheckingSlug(true)
      checkSlugAvailability(data.slug).finally(() => setCheckingSlug(false))
    }, 500)
    return () => clearTimeout(timer)
  }, [data.slug, data.slugAvailable, checkSlugAvailability])

  // Fetch country price when country changes
  useEffect(() => {
    const fetchCountryPrice = async () => {
      if (!data.countryId) {
        setSelectedCountryPrice(null)
        return
      }

      setLoadingPrice(true)
      
      const { data: priceData, error } = await supabase
        .schema('features')
        .from('country_features')
        .select(`
          price_number,
          features!inner (name)
        `)
        .eq('country_id', data.countryId)
        .eq('features.name', 'core')
        .single()

      if (!error && priceData) {
        setSelectedCountryPrice(priceData.price_number)
      } else {
        setSelectedCountryPrice(null)
      }
      
      setLoadingPrice(false)
    }

    fetchCountryPrice()
  }, [data.countryId])

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
      case 'state':
        if (showStateField && !value?.trim()) return 'State is required for Nigerian schools'
        return null
      default:
        return null
    }
  }

  const handleChange = (field, value) => {
    updateData({ [field]: value })
    if (field === "countryId") {
      updateData({ selectedSections: [], state: '' })
    }
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, data[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be less than 2MB')
      return
    }

    setUploadingLogo(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `logo_${Date.now()}.${fileExt}`
      const filePath = `school_logos/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('school-logos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('school-logos')
        .getPublicUrl(filePath)

      updateData({ logo_url: publicUrl })
    } catch (error) {
      console.error('Logo upload error:', error)
      alert('Failed to upload logo. Please try again.')
    } finally {
      setUploadingLogo(false)
    }
  }

  const isStepValid = () => {
    const fields = ['schoolName', 'slug', 'contactEmail', 'countryId']
    if (showStateField) fields.push('state')
    
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

  const selectedCountry = countries.find(c => c.id === data.countryId)
  const currencySymbol = selectedCountry?.currency_symbol || '₦'

  return (
    <form onSubmit={handleNext} className="step-form">
      <div className="step-header">
        <span className="step-number">Step 1 of 5</span>
        <h2>Tell us about your school</h2>
        <p>This information will be displayed throughout your school app.</p>
      </div>

      <div className="form-grid">
        <div className="form-field full">
          <label>School Logo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {data.logo_url ? (
              <img 
                src={data.logo_url} 
                alt="School logo preview" 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
            ) : (
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#f8fafc', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px dashed #cbd5e1',
                color: '#94a3b8',
                fontSize: '12px'
              }}>
                No logo
              </div>
            )}
            <label style={{
              padding: '8px 16px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '40px',
              fontSize: '13px',
              cursor: 'pointer',
              color: '#1e293b',
              fontWeight: 500
            }}>
              {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
                style={{ display: 'none' }}
              />
            </label>
            {data.logo_url && (
              <button
                type="button"
                onClick={() => updateData({ logo_url: '' })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            )}
          </div>
          <small>Recommended: square image, at least 200x200px. Max 2MB.</small>
        </div>

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
                data.slugAvailable = null
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
          <small>Only lowercase letters, numbers, and hyphens. This becomes your school's unique address.</small>
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
          
          {data.countryId && (
            <div style={{ 
              marginTop: '8px', 
              padding: '8px 12px', 
              background: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
              fontSize: '13px'
            }}>
              {loadingPrice ? (
                <span style={{ color: '#475569' }}>Loading price...</span>
              ) : selectedCountryPrice ? (
                <span>
                  <strong>Price:</strong> {currencySymbol}{selectedCountryPrice.toLocaleString()} <span style={{ color: '#475569' }}>per student per term</span>
                </span>
              ) : (
                <span style={{ color: '#dc2626' }}>Price information unavailable</span>
              )}
            </div>
          )}
          <small>You pay only for active student accounts. Teachers, parents, and alumni are free.</small>
        </div>

        {showStateField && (
          <div className="form-field">
            <label>State *</label>
            <select
              value={data.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              onBlur={() => handleBlur('state')}
            >
              <option value="">Select State</option>
              {NIGERIAN_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {touched.state && errors.state && (
              <div className="field-error">{errors.state}</div>
            )}
            <small>Required for Nigerian schools to provide state-specific report card templates.</small>
          </div>
        )}

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
          <small>Used throughout your school app. Dark colors recommended.</small>
        </div>
      </div>

      <div className="step-actions">
        <button type="submit" className="btn-primary">Continue →</button>
      </div>
    </form>
  )
}
