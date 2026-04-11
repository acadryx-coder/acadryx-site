// steps/StepAcademic.jsx
import { useState } from 'react'

export default function StepAcademic({ data, updateData, back, next }) {
  const [termsPerSession, setTermsPerSession] = useState(data.termsPerSession)
  const [termNames, setTermNames] = useState(data.termNames)
  const [currentTerm, setCurrentTerm] = useState(data.currentTerm)
  const [startYear, setStartYear] = useState(data.sessionStartYear)
  const [endYear, setEndYear] = useState(data.sessionEndYear)

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i)

  const handleTermsChange = (value) => {
    const newCount = parseInt(value, 10)
    setTermsPerSession(newCount)
    // Generate default term names if the new count is different
    let newNames = [...termNames]
    if (newCount !== termNames.length) {
      newNames = []
      for (let i = 1; i <= newCount; i++) {
        // Use generic "Term X" names
        newNames.push(`Term ${i}`)
      }
      setTermNames(newNames)
      // If current term index is out of range, set to first term
      if (currentTerm && !newNames.includes(currentTerm)) {
        setCurrentTerm(newNames[0])
      }
    }
    // Update parent state
    updateData({
      termsPerSession: newCount,
      termNames: newNames,
      currentTerm: newCount !== termNames.length ? newNames[0] : currentTerm
    })
  }

  const handleTermNameChange = (index, newName) => {
    const updated = [...termNames]
    updated[index] = newName
    setTermNames(updated)
    updateData({ termNames: updated })
    if (currentTerm === termNames[index]) {
      setCurrentTerm(newName)
      updateData({ currentTerm: newName })
    }
  }

  const handleStartYearChange = (year) => {
    const start = parseInt(year, 10)
    setStartYear(start)
    let end = endYear
    if (end < start) end = start + 1
    setEndYear(end)
    updateData({ sessionStartYear: start, sessionEndYear: end })
  }

  const handleEndYearChange = (year) => {
    const end = parseInt(year, 10)
    setEndYear(end)
    updateData({ sessionEndYear: end })
  }

  const isNextEnabled = () => {
    if (endYear < startYear) return false
    if (endYear - startYear > 1) return false
    return true
  }

  return (
    <div className="step-form">
      <div className="step-header">
        <span className="step-number">Step 3 of 5</span>
        <h2>Academic setup</h2>
        <p>{"Configure your school's academic calendar."}</p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Session Start Year</label>
          <select
            value={startYear}
            onChange={(e) => handleStartYearChange(e.target.value)}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Session End Year</label>
          <select
            value={endYear}
            onChange={(e) => handleEndYearChange(e.target.value)}
          >
            {[startYear, startYear + 1].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <small>Same year or one year after (e.g., 2025/2025 or 2025/2026)</small>
        </div>

        <div className="form-field">
          <label>Number of Terms per Session</label>
          <select
            value={termsPerSession}
            onChange={(e) => handleTermsChange(e.target.value)}
          >
            <option value={2}>2 Terms (Semester)</option>
            <option value={3}>3 Terms (Trimester)</option>
            <option value={4}>4 Terms (Quarter)</option>
          </select>
        </div>

        <div className="form-field full">
          <label>Term Names</label>
          <div className="term-names-list">
            {termNames.map((name, idx) => (
              <div key={idx} className="term-name-input">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleTermNameChange(idx, e.target.value)}
                  placeholder={`Term ${idx+1}`}
                />
                {idx === 0 && <span className="term-hint">(Current term can be set below)</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label>Current Term</label>
          <select
            value={currentTerm}
            onChange={(e) => {
              setCurrentTerm(e.target.value)
              updateData({ currentTerm: e.target.value })
            }}
          >
            {termNames.map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grading System Preview */}
      {console.log(data.gradingDefaults) && data.gradingDefaults.length > 0 && (
        <div className="form-field full">
          <label>Grading System</label>
          <div className="grading-preview">
            {data.gradingDefaults.map((g, i) => (
              <div key={i} className="grade-row">
                <span className="grade-letter">{g.grade}</span>
                <span className="grade-range">{g.min_score}% - {g.max_score}%</span>
                <span className="grade-desc">{g.description}</span>
              </div>
            ))}
          </div>
          <small>You can customize these later in School Settings</small>
        </div>
      )}

      <div className="session-preview">
        <div className="preview-badge">
          {startYear}/{endYear} — {currentTerm} (first term)
        </div>
        <span>Your {termsPerSession}-term academic year is ready</span>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button
          className="btn-primary"
          onClick={next}
          disabled={!isNextEnabled()}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
