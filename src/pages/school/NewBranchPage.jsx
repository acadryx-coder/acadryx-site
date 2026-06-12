// src/pages/school/NewBranchPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { getSchoolStructure } from '../../config/schoolConfig'
import StepCurriculum from '../steps/StepCurriculum'
import StepAcademic from '../steps/StepAcademic'
import ProgressBar from '../../components/ProgressBar'
import '../../styles/onboarding.css'

const STEPS = [
  { id: 1, title: 'Setup Mode' },
  { id: 2, title: 'Branch Admin' },
  { id: 3, title: 'Curriculum' },
  { id: 4, title: 'Academic' },
  { id: 5, title: 'Review' }
]

export default function NewBranchPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [school, setSchool] = useState(null)
  const [branches, setBranches] = useState([])
  const [setupMode, setSetupMode] = useState('copy') // 'copy' or 'fresh'
  const [sourceBranchId, setSourceBranchId] = useState('')
  const [copyAcademicCalendar, setCopyAcademicCalendar] = useState(true)
  
  const [formData, setFormData] = useState({
    branchName: '',
    adminFirstName: '',
    adminSurname: '',
    adminEmail: '',
    adminPhone: '',
    selectedSections: [],
    gradingDefaults: [],
    sessionStartYear: new Date().getFullYear(),
    sessionEndYear: new Date().getFullYear() + 1,
    termsPerSession: 3,
    termNames: ['First Term', 'Second Term', 'Third Term'],
    currentTerm: 'First Term'
  })

  useEffect(() => {
    loadSchoolData()
  }, [slug])

  async function loadSchoolData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data: schoolsData } = await supabase
        .schema('schools')
        .rpc('get_school_dashboard_data', { p_owner_id: user.id })
      
      const foundSchool = schoolsData?.find(s => s.slug === slug)
      if (!foundSchool) throw new Error('School not found')
      
      setSchool(foundSchool)
      setBranches(foundSchool.branches || [])
      
      // Load curriculum structure from school's country
      const country = foundSchool.country
      if (country) {
        const structure = getSchoolStructure(country.code)
        if (structure) {
          const sections = structure.sections.map(section => ({
            name: section.name,
            level: section.level,
            selected: true,
            default_assessments: section.default_assessments || [],
            classes: section.classes.map(cls => ({
              name: cls.name,
              sequence: cls.sequence,
              selected: true,
              arms: cls.arms.map(arm => ({ name: arm, selected: true })),
              is_graduating_class: cls.is_graduating_class || false
            })),
            subjects: section.subjects.map(subj => ({
              name: subj.name,
              apply_to_all: subj.apply_to_all,
              selected: true
            }))
          }))
          
          setFormData(prev => ({
            ...prev,
            selectedSections: sections,
            gradingDefaults: structure.grading_defaults || []
          }))
        }
      }
    } catch (err) {
      setError(err.message)
    }
  }

  function updateFormData(updates) {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  function next() {
    console.log('Next clicked. Current step: ' + step + ', Mode: ' + setupMode);
    setStep(step + 1);
  }
  
  function back() {
    setStep(step - 1)
  }

  async function submit() {
    setLoading(true)
    setError(null)

    try {
      const selectedSectionsPayload = formData.selectedSections
        .filter(s => s.selected)
        .map(section => ({
          section_name: section.name,
          level: section.level,
          default_assessments: section.default_assessments || [],  // ← ADD THIS
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
        
        const { data, error: rpcError } = await supabase
          .schema('schools')
          .rpc('create_new_branch', {
            p_school_id: school.school_id,
            p_branch_name: formData.branchName,
            p_setup_mode: setupMode,
            p_admin_first_name: formData.adminFirstName,
            p_admin_surname: formData.adminSurname,
            p_admin_email: formData.adminEmail,
            p_admin_phone: formData.adminPhone || null,
            p_source_branch_id: setupMode === 'copy' ? sourceBranchId : null,
            p_session_start_year: setupMode === 'fresh' || !copyAcademicCalendar ? formData.sessionStartYear : null,
            p_session_end_year: setupMode === 'fresh' || !copyAcademicCalendar ? formData.sessionEndYear : null,
            p_terms_per_session: setupMode === 'fresh' || !copyAcademicCalendar ? formData.termsPerSession : null,
            p_term_names: setupMode === 'fresh' ? formData.termNames : null,
            p_current_term_name: setupMode === 'fresh' || !copyAcademicCalendar ? formData.currentTerm : null,
            p_selected_sections: setupMode === 'fresh' ? selectedSectionsPayload : null,
            p_grading_defaults: setupMode === 'fresh' ? formData.gradingDefaults : null
          })
          
      if (rpcError) throw rpcError
      if (!data.success) throw new Error(data.error || 'Branch creation failed')

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
          <div className="success-icon">🏢</div>
          <h2>Branch Created Successfully!</h2>
          <p>{formData.branchName} is ready.</p>
          <p style={{ fontSize: 14, marginTop: 16 }}>Admin Login Code:</p>
          <div className="login-code">{success.admin_login_code}</div>
          <button onClick={() => navigate(`/school/${slug}`)} className="btn-primary">
            Back to School Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <button 
          onClick={() => navigate(`/school/${slug}`)}
          style={{ marginBottom: 16, color: 'blue'}}
        >
          ← Back to School
        </button>
        <h1>Create New Branch</h1>
        <ProgressBar currentStep={step} totalSteps={setupMode === 'copy' ? 3 : 5} />
      </div>

      <div className="onboarding-content">
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <div className="step-form">
            <div className="step-header">
              <span className="step-number">Step 1 of {setupMode === 'copy' ? 3 : 5}</span>
              <h2>Branch Setup</h2>
              <p>Choose how you want to set up this branch.</p>
            </div>

            <div className="form-grid">
              <div className="form-field full">
                <label>Branch Name *</label>
                <input
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => updateFormData({ branchName: e.target.value })}
                  placeholder="e.g., Lekki Campus"
                />
              </div>

              <div className="form-field full">
                <label>Setup Mode</label>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="copy"
                      checked={setupMode === 'copy'}
                      onChange={() => setSetupMode('copy')}
                    />
                    <span>Copy from existing branch</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="fresh"
                      checked={setupMode === 'fresh'}
                      onChange={() => setSetupMode('fresh')}
                    />
                    <span>Fresh setup (manual)</span>
                  </label>
                </div>
              </div>

              {setupMode === 'copy' && (
                <>
                  <div className="form-field full">
                    <label>Source Branch *</label>
                    <select
                      value={sourceBranchId}
                      onChange={(e) => setSourceBranchId(e.target.value)}
                    >
                      <option value="">Select a branch to copy from</option>
                      {branches.map(b => (
                        <option key={b.branch_id} value={b.branch_id}>
                          {b.branch_name} {b.is_main ? '(Main)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field full">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={copyAcademicCalendar}
                        onChange={(e) => setCopyAcademicCalendar(e.target.checked)}
                      />
                      <span>Copy academic calendar from source branch</span>
                    </label>
                    <small>If unchecked, you'll set a new academic calendar.</small>
                  </div>
                </>
              )}
            </div>

            <div className="step-actions">
              <button 
                className="btn-primary" 
                onClick={next} 
                disabled={!formData.branchName || (setupMode === 'copy' && !sourceBranchId)}
                style={{ 
                  background: (!formData.branchName || (setupMode === 'copy' && !sourceBranchId)) ? '#9ca3af' : '#0b29be',
                  color: 'white', 
                  padding: '10px 24px',
                  borderRadius: '40px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: (!formData.branchName || (setupMode === 'copy' && !sourceBranchId)) ? 'not-allowed' : 'pointer',
                  opacity: (!formData.branchName || (setupMode === 'copy' && !sourceBranchId)) ? 0.6 : 1,
                  width: '100%'
                }}
              >
                Continue →
              </button>
            </div>
            
          </div>
        )}

        {step === 2 && (
          <div className="step-form">
            <div className="step-header">
              <span className="step-number">Step 2 of {setupMode === 'copy' ? 3 : 5}</span>
              <h2>Branch Admin</h2>
              <p>Create the admin account for this branch.</p>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>First Name *</label>
                <input
                  type="text"
                  value={formData.adminFirstName}
                  onChange={(e) => updateFormData({ adminFirstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="form-field">
                <label>Surname *</label>
                <input
                  type="text"
                  value={formData.adminSurname}
                  onChange={(e) => updateFormData({ adminSurname: e.target.value })}
                  placeholder="Doe"
                />
              </div>
              <div className="form-field full">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => updateFormData({ adminEmail: e.target.value })}
                  placeholder="admin@branch.com"
                />
              </div>
              <div className="form-field full">
                <label>Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.adminPhone}
                  onChange={(e) => updateFormData({ adminPhone: e.target.value })}
                  placeholder="+234 801 234 5678"
                />
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={back}>← Back</button>
              <button 
                className="btn-primary" 
                onClick={next}
                disabled={!formData.adminFirstName || !formData.adminSurname || !formData.adminEmail}
                style={{ 
                  background: (!formData.adminFirstName || !formData.adminSurname || !formData.adminEmail) ? '#9ca3af' : '#0b29be',
                  color: 'white', 
                  padding: '10px 24px',
                  borderRadius: '40px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: (!formData.adminFirstName || !formData.adminSurname || !formData.adminEmail) ? 'not-allowed' : 'pointer',
                  opacity: (!formData.adminFirstName || !formData.adminSurname || !formData.adminEmail) ? 0.6 : 1
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {setupMode === 'fresh' && step === 3 && (
          <StepCurriculum
            data={formData}
            updateData={updateFormData}
            back={back}
            next={next}
          />
        )}

        {setupMode === 'fresh' && step === 4 && (
          <StepAcademic
            data={formData}
            updateData={updateFormData}
            back={back}
            next={next}
          />
        )}

        {((setupMode === 'copy' && step === 3) || (setupMode === 'fresh' && step === 5)) && (
          <div className="step-form">
            <div className="step-header">
              <span className="step-number">Step {setupMode === 'copy' ? 3 : 5} of {setupMode === 'copy' ? 3 : 5}</span>
              <h2>Review</h2>
              <p>Confirm everything looks correct.</p>
            </div>

            <div className="review-grid">
              <div className="review-section">
                <h3>Branch Details</h3>
                <div className="review-row"><span>Branch Name:</span><span>{formData.branchName}</span></div>
                <div className="review-row"><span>Setup Mode:</span><span>{setupMode === 'copy' ? 'Copy from existing' : 'Fresh setup'}</span></div>
                {setupMode === 'copy' && (
                  <div className="review-row">
                    <span>Source:</span>
                    <span>{branches.find(b => b.branch_id === sourceBranchId)?.branch_name || 'Unknown'}</span>
                  </div>
                )}
              </div>

              <div className="review-section">
                <h3>Admin Account</h3>
                <div className="review-row"><span>Name:</span><span>{formData.adminFirstName} {formData.adminSurname}</span></div>
                <div className="review-row"><span>Email:</span><span>{formData.adminEmail}</span></div>
                {formData.adminPhone && <div className="review-row"><span>Phone:</span><span>{formData.adminPhone}</span></div>}
              </div>

              {setupMode === 'fresh' && (
                <div className="review-section">
                  <h3>Academic Calendar</h3>
                  <div className="review-row"><span>Session:</span><span>{formData.sessionStartYear}/{formData.sessionEndYear}</span></div>
                  <div className="review-row"><span>Terms:</span><span>{formData.termsPerSession} ({formData.termNames.join(', ')})</span></div>
                  <div className="review-row"><span>Current Term:</span><span>{formData.currentTerm}</span></div>
                </div>
              )}
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={back} disabled={loading}>← Back</button>
              <button className="btn-primary" onClick={submit} disabled={loading}>
                {loading ? 'Creating Branch...' : 'Create Branch →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
