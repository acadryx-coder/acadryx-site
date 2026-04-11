// OnboardingWizard.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getSchoolStructure } from '../config/schoolConfig'
import StepSchoolInfo from './steps/StepSchoolInfo'
import StepCurriculum from './steps/StepCurriculum'
import StepAcademic from './steps/StepAcademic'
import StepAdmin from './steps/StepAdmin'
import StepReview from './steps/StepReview'
import ProgressBar from '../components/ProgressBar'
import { saveOnboardingProgress, loadOnboardingProgress, clearOnboardingProgress } from '../utils/onboardingStorage'
import '../styles/onboarding.css'

const STEPS = [
  { id: 1, title: 'School Info' },
  { id: 2, title: 'Curriculum' },
  { id: 3, title: 'Academic Setup' },
  { id: 4, title: 'Admin' },
  { id: 5, title: 'Review' }
]

// Debounce helper
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [countries, setCountries] = useState([])
  const [isRestoring, setIsRestoring] = useState(true)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const curriculumLoadedRef = useRef(null)
  const autoSaveTimerRef = useRef(null)

  // Form data structure matching RPC parameters
  const [formData, setFormData] = useState({
    schoolName: '',
    shortName: '',
    slug: '',
    slugAvailable: null,
    slugManuallyEdited: false,
    logo_url: '',
    address: '',
    city: '',
    state: '',
    contactEmail: '',
    contactPhone: '',
    brandColor: '#0b29be',
    countryId: '',
    branchName: 'MAIN',

    // Curriculum (to be built from config)
    selectedSections: [],
    gradingDefaults: [],

    // Academic Setup
    sessionStartYear: new Date().getFullYear(),
    sessionEndYear: new Date().getFullYear() + 1,
    termsPerSession: 3,
    termNames: ['First Term', 'Second Term', 'Third Term'],
    currentTerm: 'First Term',

    // Admin
    adminFirstName: '',
    adminSurname: '',
    adminEmail: '',
    adminPhone: ''
  })

  // Load saved progress on mount - BEFORE initializing formData
  useEffect(() => {
    const savedProgress = loadOnboardingProgress()
    console.log("savedProgress", savedProgress)
    if (savedProgress && savedProgress.formData) {
      const restored = savedProgress.formData
    console.log("restored", restored)
      setFormData(prev => ({
        ...prev,
        ...restored,
        selectedSections: restored.selectedSections || [],
        gradingDefaults: restored.gradingDefaults || [],
        termNames: restored.termNames || ['First Term', 'Second Term', 'Third Term']
      }))
      setStep(savedProgress.step || 1)
    }
    setIsRestoring(false)
    setIsInitialized(true)
  }, [])

  // Debounced formData for auto-save (only after initialization)
  const debouncedFormData = useDebounce(formData, 800)

  // Auto-save whenever debounced formData changes (only after restoration is complete)
  useEffect(() => {
    if (isRestoring) return
    if (success) return
    if (!isInitialized) return
    
    setIsAutoSaving(true)
    saveOnboardingProgress(debouncedFormData, step)
    
    const timer = setTimeout(() => setIsAutoSaving(false), 500)
    return () => clearTimeout(timer)
  }, [debouncedFormData, step, isRestoring, success, isInitialized])

  // Load countries on mount
  useEffect(() => {
    supabase
      .schema('acadryx')
      .from('countries')
      .select('id, name, code, currency_symbol')
      .order('name')
      .then(({ data }) => setCountries(data || []))
  }, [])

  // Auto-generate slug from school name if not manually edited
  useEffect(() => {
    if (formData.schoolName && !formData.slugManuallyEdited && !isRestoring) {
      const generatedSlug = formData.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 50)
      setFormData(prev => ({ ...prev, slug: generatedSlug, slugAvailable: null }))
    }
  }, [formData.schoolName, formData.slugManuallyEdited, isRestoring])

  // Check slug availability
  const checkSlugAvailability = async (slug) => {
    if (!slug || slug.length < 3) return
    const { data } = await supabase
      .schema('schools')
      .from('schools')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle()
    setFormData(prev => ({ ...prev, slugAvailable: data ? false : true }))
  }

  // When country changes, load curriculum structure with assessments
  useEffect(() => {
    if (curriculumLoadedRef.current === formData.countryId) return
    if (formData.countryId && countries.length > 0 && !isRestoring) {
      const country = countries.find(c => c.id === formData.countryId)
      if (country) {
        const structure = getSchoolStructure(country.code)
        if (structure && structure.sections) {
          const sections = structure.sections.map(section => ({
            name: section.name,
            level: section.level,
            selected: false,
            default_assessments: section.default_assessments || [],
            classes: section.classes.map(cls => ({
              name: cls.name,
              sequence: cls.sequence,
              selected: true,
              arms: cls.arms.map(arm => ({ name: arm, selected: true }))
            })),
            subjects: section.subjects.map(subj => ({
              name: subj.name,
              apply_to_all: subj.apply_to_all,
              selected: true
            }))
          }))
          
          const gradingDefaults = structure.grading_defaults || []
          
          setFormData(prev => ({ 
            ...prev, 
            selectedSections: sections,
            gradingDefaults: gradingDefaults
          }))
          curriculumLoadedRef.current = formData.countryId
        }
      }
    }
  }, [formData.countryId, countries, isRestoring])

  const updateFormData = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }, [])

  const next = () => {
    const newStep = step + 1
    setStep(newStep)
    saveOnboardingProgress(formData, newStep)
  }

  const back = () => {
    const newStep = step - 1
    setStep(newStep)
    saveOnboardingProgress(formData, newStep)
  }

  const submit = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const selectedSectionsPayload = formData.selectedSections
        .filter(s => s.selected)
        .map(section => ({
          section_name: section.name,
          level: section.level,
          default_assessments: section.default_assessments || [],
          classes: section.classes
            .filter(c => c.selected)
            .map(cls => ({
              name: cls.name,
              sequence: cls.sequence,
              arms: cls.arms.filter(a => a.selected).map(a => a.name),
              is_graduating_class: cls.is_graduating_class || false
            })),
          subjects: section.subjects
            .filter(s => s.selected)
            .map(subj => ({
              subject_name: subj.name,
              apply_to_all: subj.apply_to_all
            }))
        }))

      const { data, error: rpcError } = await supabase.schema('schools').rpc('create_complete_school_structure', {
        p_owner_id: user.id,
        p_school_name: formData.schoolName.trim(),
        p_short_name: formData.shortName.trim() || null,
        p_slug: formData.slug.trim(),
        p_logo_url: formData.logo_url || null,
        p_address: formData.address.trim() || null,
        p_city: formData.city.trim() || null,
        p_state: formData.state.trim() || null,
        p_contact_email: formData.contactEmail.trim(),
        p_contact_phone: formData.contactPhone.trim() || null,
        p_brand_color: formData.brandColor,
        p_country_id: formData.countryId,
        p_branch_name: formData.branchName.trim(),
        p_session_start_year: formData.sessionStartYear,
        p_session_end_year: formData.sessionEndYear,
        p_terms_per_session: formData.termsPerSession,
        p_term_names: formData.termNames,
        p_current_term_name: formData.currentTerm,
        p_admin_first_name: formData.adminFirstName.trim(),
        p_admin_surname: formData.adminSurname.trim(),
        p_admin_email: formData.adminEmail.trim(),
        p_admin_phone: formData.adminPhone.trim() || null,
        p_selected_sections: selectedSectionsPayload,
        p_grading_defaults: formData.gradingDefaults
      })
      
      if (rpcError) throw rpcError
      if (!data.success) throw new Error(data.error || 'School creation failed')

      clearOnboardingProgress()
      setSuccess(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while restoring saved progress
  if (isRestoring) {
    return (
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1>Set up your school</h1>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '0%' }}></div>
          </div>
        </div>
        <div className="onboarding-content" style={{ textAlign: 'center', padding: '60px' }}>
          <div className="dash-spinner" style={{ margin: '0 auto 20px' }}></div>
          <p>Restoring your progress...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="onboarding-success">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>School Created Successfully!</h2>
          <p>Your school is ready. Here's your admin login code:</p>
          <p>acadryx.vercel.app/?school={success.school_slug}</p>
          <div className="login-code">{success.admin_login_code}</div>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h1>Set up your school</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <ProgressBar currentStep={step} totalSteps={STEPS.length} />
          {isAutoSaving && (
            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '12px' }}>
              Saving...
            </span>
          )}
        </div>
      </div>

      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <StepSchoolInfo
            data={formData}
            updateData={updateFormData}
            countries={countries}
            checkSlugAvailability={checkSlugAvailability}
            next={next}
          />
        )}
        {step === 2 && (
          <StepCurriculum
            data={formData}
            updateData={updateFormData}
            back={back}
            next={next}
          />
        )}
        {step === 3 && (
          <StepAcademic
            data={formData}
            updateData={updateFormData}
            back={back}
            next={next}
          />
        )}
        {step === 4 && (
          <StepAdmin
            data={formData}
            updateData={updateFormData}
            back={back}
            next={next}
          />
        )}
        {step === 5 && (
          <StepReview
            data={formData}
            back={back}
            submit={submit}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}
