// OnboardingWizard.jsx — Complete rewrite
// Calls create_complete_school_structure() on Supabase via RPC

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  SCHOOL_TYPE_CONFIG,
  SCHOOL_TYPES_ORDER,
  getDefaultSections,
  buildStructurePayload,
} from '../config/schoolConfig'
import '../styles/onboarding.css'

const STEPS = [
  { id: 1, title: 'School Info',      short: 'Info'      },
  { id: 2, title: 'School Types',     short: 'Types'     },
  { id: 3, title: 'School Link',      short: 'Link'      },
  { id: 4, title: 'Academic Setup',   short: 'Academic'  },
  { id: 5, title: 'Review',           short: 'Review'    },
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 2 + i)

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(null) // success payload
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Editable structure per type key
  const [editedSections, setEditedSections] = useState({})

  const [form, setForm] = useState({
    // Step 1
    schoolName: '',
    shortName: '',
    address: '',
    city: '',
    state: '',
    contactEmail: '',
    contactPhone: '',
    brandColor: '#1a6bff',
    countryId: '',
    branchName: 'MAIN',
    // Step 2
    selectedTypes: [],
    // Step 3
    slug: '',
    slugAvailable: null,
    // Step 4
    sessionStartYear: CURRENT_YEAR,
    sessionEndYear: CURRENT_YEAR + 1,
    currentTerm: '1st Term',
    numberOfTerms: 3,
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  // Load countries on mount
  useEffect(() => {
    supabase
      .from('countries')
      .select('id, name, code, currency, currency_symbol, price_per_student')
      .order('name')
      .then(({ data }) => setCountries(data || []))
  }, [])

  // Auto-generate slug from school name
  useEffect(() => {
    if (form.schoolName) {
      const slug = form.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      set('slug', slug)
      set('slugAvailable', null)
    }
  }, [form.schoolName])

  // Sync country selection
  useEffect(() => {
    const c = countries.find((c) => c.id === form.countryId) || null
    setSelectedCountry(c)
  }, [form.countryId, countries])

  // When types are toggled, init editedSections for new types
  const toggleType = (typeKey) => {
    const current = form.selectedTypes
    const next = current.includes(typeKey)
      ? current.filter((t) => t !== typeKey)
      : [...current, typeKey]
    set('selectedTypes', next)
    if (!current.includes(typeKey) && !editedSections[typeKey]) {
      setEditedSections((s) => ({ ...s, [typeKey]: getDefaultSections(typeKey) }))
    }
  }

  // Check slug availability
  const checkSlug = useCallback(async (slug) => {
    if (!slug || slug.length < 3) return
    const { data } = await supabase
      .from('schools')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle()
    set('slugAvailable', data ? false : true)
  }, [])

  // Validate per step
  const validate = () => {
    setError(null)
    switch (step) {
      case 1:
        if (!form.schoolName.trim()) return setError('School name is required') || false
        if (!form.contactEmail.trim()) return setError('Contact email is required') || false
        if (!form.countryId) return setError('Please select your country') || false
        return true
      case 2:
        if (form.selectedTypes.length === 0)
          return setError('Select at least one school type') || false
        return true
      case 3:
        if (!form.slug.trim() || form.slug.length < 3)
          return setError('School link must be at least 3 characters') || false
        if (!/^[a-z0-9-]+$/.test(form.slug))
          return setError('Only lowercase letters, numbers, and hyphens') || false
        if (form.slugAvailable === false)
          return setError('This link is already taken') || false
        return true
      case 4:
        if (form.sessionEndYear < form.sessionStartYear)
          return setError('End year cannot be before start year') || false
        if (form.sessionEndYear - form.sessionStartYear > 1)
          return setError('End year can only be the same as or one year after start year') || false
        return true
      default:
        return true
    }
  }

  const next = async () => {
    if (!validate()) return
    if (step === 3 && form.slugAvailable === null) {
      await checkSlug(form.slug)
      if (form.slugAvailable === false) return
    }
    if (step < 5) setStep((s) => s + 1)
    else await submit()
  }

  const back = () => {
    setError(null)
    setStep((s) => s - 1)
  }

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const structure = buildStructurePayload(form.selectedTypes, editedSections)
      const sessionName = `${form.sessionStartYear}/${form.sessionEndYear}`

      const { data, error: rpcErr } = await supabase.rpc('create_complete_school_structure', {
        p_owner_id:           user.id,
        p_school_name:        form.schoolName.trim(),
        p_short_name:         form.shortName.trim() || form.schoolName.trim(),
        p_slug:               form.slug.trim(),
        p_address:            form.address.trim(),
        p_city:               form.city.trim(),
        p_state:              form.state.trim(),
        p_contact_email:      form.contactEmail.trim(),
        p_contact_phone:      form.contactPhone.trim(),
        p_brand_color:        form.brandColor,
        p_country_id:         form.countryId,
        p_currency:           selectedCountry?.currency || 'USD',
        p_price_per_student:  selectedCountry?.price_per_student || 0,
        p_branch_name:        form.branchName.trim() || 'MAIN',
        p_session_start_year: form.sessionStartYear,
        p_session_end_year:   form.sessionEndYear,
        p_current_term:       form.currentTerm,
        p_number_of_terms:    form.numberOfTerms,
        p_structure:          structure,
        p_admin_user_id:      user.id,
        p_admin_first_name:   user.user_metadata?.first_name || 'Admin',
        p_admin_surname:      user.user_metadata?.surname || '',
        p_logo_url:           null,
      })

      if (rpcErr) throw rpcErr
      if (!data?.success) throw new Error(data?.error || 'School creation failed')

      setDone(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) return <StepSuccess data={done} form={form} />

  return (
    <div className="wiz-shell">
      {/* Header */}
      <div className="wiz-header">
        <span className="wiz-logo" onClick={() => navigate('/')}>Acadryx</span>
        <div className="wiz-progress">
          {STEPS.map((s) => (
            <div key={s.id} className={`wiz-pip ${step >= s.id ? 'done' : ''} ${step === s.id ? 'active' : ''}`}>
              <div className="pip-dot">{step > s.id ? '✓' : s.id}</div>
              <span className="pip-label">{s.short}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="wiz-body">
        <div className="wiz-card">
          {step === 1 && (
            <Step1
              form={form} set={set}
              countries={countries}
              selectedCountry={selectedCountry}
            />
          )}
          {step === 2 && (
            <Step2
              form={form}
              toggleType={toggleType}
              editedSections={editedSections}
              setEditedSections={setEditedSections}
            />
          )}
          {step === 3 && (
            <Step3 form={form} set={set} checkSlug={checkSlug} />
          )}
          {step === 4 && (
            <Step4 form={form} set={set} />
          )}
          {step === 5 && (
            <Step5 form={form} selectedCountry={selectedCountry} editedSections={editedSections} />
          )}

          {error && <div className="wiz-error">⚠ {error}</div>}

          <div className="wiz-nav">
            {step > 1 && (
              <button className="wiz-btn-ghost" onClick={back} disabled={submitting}>
                ← Back
              </button>
            )}
            <button
              className="wiz-btn-primary"
              onClick={next}
              disabled={loading || submitting}
            >
              {submitting
                ? 'Creating your school...'
                : step === 5
                ? 'Create School →'
                : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP 1 — School Info
// ─────────────────────────────────────────────
function Step1({ form, set, countries, selectedCountry }) {
  return (
    <div className="step-wrap">
      <div className="step-head">
        <span className="step-eyebrow">Step 1 of 5</span>
        <h2>Tell us about your school</h2>
        <p>This information will be displayed throughout your school app.</p>
      </div>

      <div className="field-grid">
        <div className="field full">
          <label>School Name <span className="req">*</span></label>
          <input
            type="text"
            value={form.schoolName}
            onChange={(e) => set('schoolName', e.target.value)}
            placeholder="e.g., Greenfield Academy"
          />
        </div>

        <div className="field">
          <label>Short Name / Abbreviation</label>
          <input
            type="text"
            value={form.shortName}
            onChange={(e) => set('shortName', e.target.value)}
            placeholder="e.g., GFA"
          />
          <small>Used in tight spaces like result slips</small>
        </div>

        <div className="field">
          <label>Country <span className="req">*</span></label>
          <select value={form.countryId} onChange={(e) => set('countryId', e.target.value)}>
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {selectedCountry && (
            <small className="country-hint">
              Pricing: {selectedCountry.currency_symbol}{selectedCountry.price_per_student} per student per term
            </small>
          )}
        </div>

        <div className="field">
          <label>Main Branch Name</label>
          <input
            type="text"
            value={form.branchName}
            onChange={(e) => set('branchName', e.target.value)}
            placeholder="MAIN"
          />
          <small>You can add more branches from your dashboard later</small>
        </div>

        <div className="field full">
          <label>Address</label>
          <textarea
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="Street address"
            rows={2}
          />
        </div>

        <div className="field">
          <label>City</label>
          <input type="text" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="City" />
        </div>

        <div className="field">
          <label>State / Province</label>
          <input type="text" value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="State" />
        </div>

        <div className="field">
          <label>Contact Email <span className="req">*</span></label>
          <input type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} placeholder="info@yourschool.com" />
        </div>

        <div className="field">
          <label>Contact Phone</label>
          <input type="tel" value={form.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} placeholder="+234 806 000 0000" />
        </div>

        <div className="field">
          <label>Brand Colour</label>
          <div className="color-pick">
            <input type="color" value={form.brandColor} onChange={(e) => set('brandColor', e.target.value)} />
            <span>{form.brandColor}</span>
          </div>
          <small>Used throughout your school app</small>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP 2 — School Types + Structure Editor
// ─────────────────────────────────────────────
function Step2({ form, toggleType, editedSections, setEditedSections }) {
  return (
    <div className="step-wrap">
      <div className="step-head">
        <span className="step-eyebrow">Step 2 of 5</span>
        <h2>What levels does your school offer?</h2>
        <p>Select all that apply. We'll pre-fill your sections, classes, and subjects. You can edit them below or anytime from your dashboard.</p>
      </div>

      <div className="type-grid">
        {SCHOOL_TYPES_ORDER.map((typeKey) => {
          const config = SCHOOL_TYPE_CONFIG[typeKey]
          const selected = form.selectedTypes.includes(typeKey)
          return (
            <div
              key={typeKey}
              className={`type-card ${selected ? 'selected' : ''}`}
              onClick={() => toggleType(typeKey)}
            >
              <div className="type-check">{selected ? '✓' : ''}</div>
              <div className="type-icon">{config.icon}</div>
              <div className="type-name">{config.name}</div>
              <div className="type-label">{config.label}</div>
            </div>
          )
        })}
      </div>

      {form.selectedTypes.length > 0 && (
        <div className="structure-editor">
          <div className="struct-title">
            Your school structure
            <span className="struct-hint">Edit section names, add/remove classes and arms</span>
          </div>
          {SCHOOL_TYPES_ORDER.filter((t) => form.selectedTypes.includes(t)).map((typeKey) => (
            <TypeStructureEditor
              key={typeKey}
              typeKey={typeKey}
              sections={editedSections[typeKey] || getDefaultSections(typeKey)}
              onChange={(sections) =>
                setEditedSections((s) => ({ ...s, [typeKey]: sections }))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TypeStructureEditor({ typeKey, sections, onChange }) {
  const config = SCHOOL_TYPE_CONFIG[typeKey]
  const subjectNames = Object.keys(config.subjects)

  const updateSection = (idx, key, val) => {
    const next = sections.map((s, i) => (i === idx ? { ...s, [key]: val } : s))
    onChange(next)
  }

  const addSection = () => {
    onChange([...sections, { name: 'New Section', classes: ['Class 1'], arms: ['A', 'B', 'C'] }])
  }

  const removeSection = (idx) => onChange(sections.filter((_, i) => i !== idx))

  const addClass = (sIdx) => {
    const s = sections[sIdx]
    updateSection(sIdx, 'classes', [...s.classes, `Class ${s.classes.length + 1}`])
  }

  const updateClass = (sIdx, cIdx, val) => {
    const s = sections[sIdx]
    const cls = s.classes.map((c, i) => (i === cIdx ? val : c))
    updateSection(sIdx, 'classes', cls)
  }

  const removeClass = (sIdx, cIdx) => {
    const s = sections[sIdx]
    updateSection(sIdx, 'classes', s.classes.filter((_, i) => i !== cIdx))
  }

  const addArm = (sIdx) => {
    const s = sections[sIdx]
    const next = String.fromCharCode(65 + s.arms.length)
    updateSection(sIdx, 'arms', [...s.arms, next])
  }

  const removeArm = (sIdx, aIdx) => {
    const s = sections[sIdx]
    updateSection(sIdx, 'arms', s.arms.filter((_, i) => i !== aIdx))
  }

  const [showSubjects, setShowSubjects] = useState(false)

  return (
    <div className="type-editor">
      <div className="type-editor-header">
        <span className="type-editor-icon">{config.icon}</span>
        <span className="type-editor-name">{config.name}</span>
      </div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="section-block">
          <div className="section-row">
            <input
              className="section-name-input"
              value={section.name}
              onChange={(e) => updateSection(sIdx, 'name', e.target.value)}
            />
            {sections.length > 1 && (
              <button className="btn-xs btn-danger" onClick={() => removeSection(sIdx)}>Remove</button>
            )}
          </div>

          <div className="classes-row">
            <span className="row-label">Classes</span>
            <div className="tags-wrap">
              {section.classes.map((cls, cIdx) => (
                <div key={cIdx} className="tag-edit">
                  <input
                    className="tag-input"
                    value={cls}
                    onChange={(e) => updateClass(sIdx, cIdx, e.target.value)}
                  />
                  <button className="tag-del" onClick={() => removeClass(sIdx, cIdx)}>×</button>
                </div>
              ))}
              <button className="tag-add" onClick={() => addClass(sIdx)}>+ Add class</button>
            </div>
          </div>

          <div className="classes-row">
            <span className="row-label">Arms</span>
            <div className="tags-wrap">
              {section.arms.map((arm, aIdx) => (
                <div key={aIdx} className="arm-tag">
                  {arm}
                  <button className="tag-del" onClick={() => removeArm(sIdx, aIdx)}>×</button>
                </div>
              ))}
              {section.arms.length < 8 && (
                <button className="tag-add" onClick={() => addArm(sIdx)}>+ Add arm</button>
              )}
            </div>
            <small className="arm-preview">
              e.g. {section.classes[0]}{section.arms[0]}, {section.classes[0]}{section.arms[1] || 'B'}
            </small>
          </div>
        </div>
      ))}

      <button className="btn-add-section" onClick={addSection}>+ Add section</button>

      <div className="subjects-toggle" onClick={() => setShowSubjects((v) => !v)}>
        <span>📖 {subjectNames.length} subjects will be created</span>
        <span>{showSubjects ? '▲ Hide' : '▼ Preview'}</span>
      </div>
      {showSubjects && (
        <div className="subjects-list">
          {subjectNames.map((name) => {
            const components = config.subjects[name]
            return (
              <div key={name} className="subject-item">
                <span className="subject-name">{name}</span>
                {components.length > 1 && (
                  <span className="subject-components">
                    {components.map((c) => `${c.name} (${c.weight}%)`).join(' · ')}
                  </span>
                )}
              </div>
            )
          })}
          <div className="subjects-note">
            You can add, remove, and customize subjects from your school dashboard after setup.
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP 3 — Slug Selection
// ─────────────────────────────────────────────
function Step3({ form, set, checkSlug }) {
  return (
    <div className="step-wrap">
      <div className="step-head">
        <span className="step-eyebrow">Step 3 of 5</span>
        <h2>Choose your school link</h2>
        <p>This becomes your school's unique address. Students and parents will use this URL.</p>
      </div>

      <div className="slug-preview-box">
        <span className="slug-domain">acadryx.com/</span>
        <span className="slug-val">{form.slug || 'yourschool'}</span>
      </div>

      <div className="field full">
        <label>School link</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => {
            const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
            set('slug', slug)
            set('slugAvailable', null)
          }}
          onBlur={() => checkSlug(form.slug)}
          placeholder="yourschool"
        />
        {form.slugAvailable === true && (
          <div className="slug-ok">✓ Available</div>
        )}
        {form.slugAvailable === false && (
          <div className="slug-bad">✗ Already taken — try something else</div>
        )}
        <small>Only lowercase letters, numbers, and hyphens</small>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP 4 — Academic Setup
// ─────────────────────────────────────────────
function Step4({ form, set }) {
  const endYearOptions = [form.sessionStartYear, form.sessionStartYear + 1]

  return (
    <div className="step-wrap">
      <div className="step-head">
        <span className="step-eyebrow">Step 4 of 5</span>
        <h2>Academic session setup</h2>
        <p>Configure your current academic year and term structure.</p>
      </div>

      <div className="field-grid">
        <div className="field">
          <label>Session Start Year <span className="req">*</span></label>
          <select
            value={form.sessionStartYear}
            onChange={(e) => {
              const y = parseInt(e.target.value)
              set('sessionStartYear', y)
              if (form.sessionEndYear < y) set('sessionEndYear', y + 1)
            }}
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Session End Year <span className="req">*</span></label>
          <select
            value={form.sessionEndYear}
            onChange={(e) => set('sessionEndYear', parseInt(e.target.value))}
          >
            {endYearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <small>Same year or one year after (e.g. 2025/2025 or 2025/2026)</small>
        </div>

        <div className="field">
          <label>Current Term</label>
          <select value={form.currentTerm} onChange={(e) => set('currentTerm', e.target.value)}>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>

        <div className="field">
          <label>Terms per Session</label>
          <select
            value={form.numberOfTerms}
            onChange={(e) => set('numberOfTerms', parseInt(e.target.value))}
          >
            <option value={2}>2 Terms (Semester)</option>
            <option value={3}>3 Terms (Trimester)</option>
            <option value={4}>4 Terms (Quarterly)</option>
          </select>
        </div>
      </div>

      <div className="session-preview">
        <div className="session-badge">
          {form.sessionStartYear}/{form.sessionEndYear} — {form.currentTerm}
        </div>
        <span>Your {form.numberOfTerms}-term academic year is ready to launch</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP 5 — Review
// ─────────────────────────────────────────────
function Step5({ form, selectedCountry, editedSections }) {
  const structure = buildStructurePayload(form.selectedTypes, editedSections)
  const totalClasses = structure.reduce((acc, t) =>
    acc + t.sections.reduce((a, s) => a + s.classes.length, 0), 0)

  return (
    <div className="step-wrap">
      <div className="step-head">
        <span className="step-eyebrow">Step 5 of 5</span>
        <h2>Review your school setup</h2>
        <p>Confirm everything looks right. Your entire school structure will be created in one go.</p>
      </div>

      <div className="review-sections">
        <div className="review-block">
          <div className="review-block-title">School Details</div>
          <ReviewRow label="Name" value={form.schoolName} />
          {form.shortName && <ReviewRow label="Short Name" value={form.shortName} />}
          <ReviewRow label="Country" value={selectedCountry?.name || '—'} />
          <ReviewRow label="Contact" value={form.contactEmail} />
          {form.city && <ReviewRow label="Location" value={`${form.city}${form.state ? ', ' + form.state : ''}`} />}
          <ReviewRow label="Main Branch" value={form.branchName || 'MAIN'} />
        </div>

        <div className="review-block">
          <div className="review-block-title">School Link</div>
          <ReviewRow label="URL" value={`${form.slug}.acadryx.com`} highlight />
        </div>

        <div className="review-block">
          <div className="review-block-title">Structure</div>
          <ReviewRow
            label="Types"
            value={form.selectedTypes.map((t) => SCHOOL_TYPE_CONFIG[t].name).join(', ')}
          />
          <ReviewRow label="Total classes" value={`${totalClasses} classes`} />
          {structure.map((t) => (
            <div key={t.type} className="review-structure-item">
              <span className="review-type-icon">{SCHOOL_TYPE_CONFIG[t.type].icon}</span>
              <div>
                <strong>{SCHOOL_TYPE_CONFIG[t.type].name}</strong>
                {t.sections.map((s) => (
                  <div key={s.name} className="review-section-line">
                    {s.name}: {s.classes.join(', ')} (Arms: {s.arms.join(', ')})
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="review-block">
          <div className="review-block-title">Academic Year</div>
          <ReviewRow label="Session" value={`${form.sessionStartYear}/${form.sessionEndYear}`} />
          <ReviewRow label="Current Term" value={form.currentTerm} />
          <ReviewRow label="Terms per year" value={`${form.numberOfTerms}`} />
        </div>

        <div className="review-block">
          <div className="review-block-title">Billing</div>
          <ReviewRow label="Setup fee" value="₦50,000 — due within 7 days" />
          {selectedCountry && (
            <ReviewRow
              label="Per-student fee"
              value={`${selectedCountry.currency_symbol}${selectedCountry.price_per_student} per student · on result day`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function ReviewRow({ label, value, highlight }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className={`review-val ${highlight ? 'highlight' : ''}`}>{value}</span>
    </div>
  )
}

// ─────────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────────
function StepSuccess({ data, form }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(null)

  const copy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  // Show Vercel URL for now — will become subdomain once DNS is set up
  const portalUrl = `https://acadryx.vercel.app?school=${data.school_slug}`
  const futureUrl = `https://${data.school_slug}.acadryx.com`

  return (
    <div className="wiz-shell">
      <div className="wiz-header">
        <span className="wiz-logo">Acadryx</span>
      </div>
      <div className="wiz-body">
        <div className="wiz-card success-card">
          <div className="success-burst">🎉</div>
          <h2 className="success-title">Your school is live.</h2>
          <p className="success-sub">
            Everything is set up — sections, classes, subjects, your academic session, and your admin access code.
          </p>

          <div className="success-items">
            <div className="success-item">
              <div className="success-item-label">School Portal Link</div>
              <div className="success-code-row">
                <code>{portalUrl}</code>
                <button
                  className={`copy-btn ${copied === 'link' ? 'copied' : ''}`}
                  onClick={() => copy(portalUrl, 'link')}
                >
                  {copied === 'link' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <small>Share this with your staff and students to access the school portal.</small>
            </div>

            <div className="success-item">
              <div className="success-item-label">Admin Login Code</div>
              <div className="success-code-row">
                <code className="big-code">{data.admin_login_code}</code>
                <button
                  className={`copy-btn ${copied === 'code' ? 'copied' : ''}`}
                  onClick={() => copy(data.admin_login_code, 'code')}
                >
                  {copied === 'code' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <small>Save this. You'll use it to log into your school portal.</small>
            </div>

            <div className="success-warning">
              <strong>⚠ Pay your setup fee within 7 days</strong> or your school will be suspended.
              You'll get daily reminders on your dashboard until it's paid.
            </div>
          </div>

          <div className="success-actions">
            <button className="wiz-btn-primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard →
            </button>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wiz-btn-ghost"
            >
              Visit School Portal ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
