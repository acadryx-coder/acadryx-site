// OnboardingWizard.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getSchoolStructure } from '../config/schoolConfig'
import StepSchoolInfo from './steps/StepSchoolInfo'
import StepCurriculum from './steps/StepCurriculum'
import StepAcademic from './steps/StepAcademic'
import StepAdmin from './steps/StepAdmin'
import StepReview from './steps/StepReview'
import ProgressBar from '../components/ProgressBar'
import '../styles/onboarding.css'

const STEPS = [
  { id: 1, title: 'School Info' },
  { id: 2, title: 'Curriculum' },
  { id: 3, title: 'Academic Setup' },
  { id: 4, title: 'Admin' },
  { id: 5, title: 'Review' }
]

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [countries, setCountries] = useState([])
  const curriculumLoadedRef = useRef(null)

  // Form data structure matching RPC parameters
  const [formData, setFormData] = useState({
    // School Info (matches RPC)
    schoolName: '',
    shortName: '',
    slug: '',
    slugAvailable: null,
    slugManuallyEdited: false,
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
    if (formData.schoolName && !formData.slugManuallyEdited) {
      const generatedSlug = formData.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 50)
      setFormData(prev => ({ ...prev, slug: generatedSlug, slugAvailable: null }))
    }
  }, [formData.schoolName, formData.slugManuallyEdited])

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

  // When country changes, load curriculum structure
  useEffect(() => {
    if (curriculumLoadedRef.current === formData.countryId) return
    if (formData.countryId) {
      const country = countries.find(c => c.id === formData.countryId)
      if (country) {
        const structure = getSchoolStructure(country.code)
        if (structure && structure.sections) {
          // Build selectedSections with the NEW structure (apply_to_all instead of is_mandatory, no components)
          const sections = structure.sections.map(section => ({
            name: section.name,
            level: section.level,
            selected: false,
            classes: section.classes.map(cls => ({
              name: cls.name,
              sequence: cls.sequence,
              selected: true,
              arms: cls.arms.map(arm => ({ name: arm, selected: true }))
            })),
            subjects: section.subjects.map(subj => ({
              name: subj.name,
              apply_to_all: subj.apply_to_all,  // ← NEW: use apply_to_all
              selected: true                     // ← subject is included in section
            }))
          }))
          
          // Get grading defaults (unchanged)
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
  }, [formData.countryId, countries])

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const next = () => {
    if (step < STEPS.length) setStep(step + 1)
    else submit()
  }

  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  const submit = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Build the selected sections payload for RPC (NEW STRUCTURE)
      const selectedSectionsPayload = formData.selectedSections
        .filter(s => s.selected)
        .map(section => ({
          section_name: section.name,
          level: section.level,
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
              apply_to_all: subj.apply_to_all  // ← NEW: send apply_to_all, not is_mandatory
            }))
        }))

      const { data, error: rpcError } = await supabase.schema('schools').rpc('create_complete_school_structure', {
        p_owner_id: user.id,
        p_school_name: formData.schoolName.trim(),
        p_short_name: formData.shortName.trim() || null,
        p_slug: formData.slug.trim(),
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

      setSuccess(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
        <ProgressBar currentStep={step} totalSteps={STEPS.length} />
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
