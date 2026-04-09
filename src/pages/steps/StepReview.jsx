// steps/StepReview.jsx
import { getSchoolStructure } from '../../config/schoolConfig'

export default function StepReview({ data, back, submit, loading }) {
  const selectedSections = data.selectedSections.filter(s => s.selected)
  const totalClasses = selectedSections.reduce((acc, s) => acc + s.classes.filter(c => c.selected).length, 0)
  const totalArms = selectedSections.reduce((acc, s) => acc + s.classes.reduce((a, c) => a + c.arms.filter(arm => arm.selected).length, 0), 0)
  const totalSubjects = selectedSections.reduce((acc, s) => acc + s.subjects.filter(sub => sub.selected).length, 0)

  return (
    <div className="step-form">
      <div className="step-header">
        <span className="step-number">Step 5 of 5</span>
        <h2>Review your setup</h2>
        <p>Confirm everything looks correct before creating your school.</p>
      </div>

      <div className="review-grid">
        <div className="review-section">
          <h3>School Details</h3>
          {data.logo_url && (
            <div className="review-row">
              <span>School Logo:</span>
              <span>
                <img 
                  src={data.logo_url} 
                  alt="School logo" 
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </span>
            </div>
          )}
          <div className="review-row">
            <span>School Name:</span>
            <span>{data.schoolName}</span>
          </div>
          {data.shortName && (
            <div className="review-row">
              <span>Short Name:</span>
              <span>{data.shortName}</span>
            </div>
          )}
          <div className="review-row">
            <span>School Link:</span>
            <span>acadryx.vercel.app/?school={data.slug}</span>
          </div>
          <div className="review-row">
            <span>Main Branch:</span>
            <span>{data.branchName || 'MAIN'}</span>
          </div>
          <div className="review-row">
            <span>Brand Color:</span>
            <span>
              <span style={{ 
                display: 'inline-block', 
                width: '20px', 
                height: '20px', 
                backgroundColor: data.brandColor,
                borderRadius: '4px',
                marginRight: '8px',
                verticalAlign: 'middle',
                border: '1px solid #e2e8f0'
              }} />
              {data.brandColor}
            </span>
          </div>
          <div className="review-row">
            <span>Contact Email:</span>
            <span>{data.contactEmail}</span>
          </div>
          {data.contactPhone && (
            <div className="review-row">
              <span>Phone:</span>
              <span>{data.contactPhone}</span>
            </div>
          )}
          {data.address && (
            <div className="review-row">
              <span>Address:</span>
              <span>{data.address}</span>
            </div>
          )}
          {data.city && (
            <div className="review-row">
              <span>Location:</span>
              <span>{data.city}{data.state ? `, ${data.state}` : ''}</span>
            </div>
          )}
        </div>

        <div className="review-section">
          <h3>School Structure</h3>
          <div className="review-row">
            <span>Sections:</span>
            <span>{selectedSections.map(s => s.name).join(', ')}</span>
          </div>
          <div className="review-row">
            <span>Total Classes:</span>
            <span>{totalClasses}</span>
          </div>
          <div className="review-row">
            <span>Total Arms:</span>
            <span>{totalArms}</span>
          </div>
          <div className="review-row">
            <span>Subjects:</span>
            <span>{totalSubjects}</span>
          </div>
        </div>

        <div className="review-section">
          <h3>Academic Calendar</h3>
          <div className="review-row">
            <span>Session:</span>
            <span>{data.sessionStartYear}/{data.sessionEndYear}</span>
          </div>
          <div className="review-row">
            <span>Terms:</span>
            <span>{data.termsPerSession} ({data.termNames.join(', ')})</span>
          </div>
          <div className="review-row">
            <span>Current Term:</span>
            <span>{data.currentTerm}</span>
          </div>
        </div>

        <div className="review-section">
          <h3>Admin Account</h3>
          <div className="review-row">
            <span>Name:</span>
            <span>{data.adminFirstName} {data.adminSurname}</span>
          </div>
          <div className="review-row">
            <span>Email:</span>
            <span>{data.adminEmail}</span>
          </div>
          {data.adminPhone && (
            <div className="review-row">
              <span>Phone:</span>
              <span>{data.adminPhone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={back} disabled={loading}>← Back</button>
        <button className="btn-primary" onClick={submit} disabled={loading}>
          {loading ? 'Creating school...' : 'Create School →'}
        </button>
      </div>
    </div>
  )
}
