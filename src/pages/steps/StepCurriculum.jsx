// steps/StepCurriculum.jsx
import { useState } from 'react'

export default function StepCurriculum({ data, updateData, back, next }) {
  const [editingSection, setEditingSection] = useState(null)
  const [newClassName, setNewClassName] = useState('')
  const [newArmName, setNewArmName] = useState('')
  const [addingClassTo, setAddingClassTo] = useState(null)
  const [addingArmTo, setAddingArmTo] = useState(null)

  const sections = data.selectedSections

  const updateSection = (sectionIndex, updates) => {
    const newSections = [...sections]
    newSections[sectionIndex] = { ...newSections[sectionIndex], ...updates }
    updateData({ selectedSections: newSections })
  }

  const toggleSection = (sectionIndex) => {
    const section = sections[sectionIndex]
    updateSection(sectionIndex, { selected: !section.selected })
  }

  const toggleClass = (sectionIndex, classIndex) => {
    const section = sections[sectionIndex]
    const newClasses = [...section.classes]
    newClasses[classIndex] = { ...newClasses[classIndex], selected: !newClasses[classIndex].selected }
    updateSection(sectionIndex, { classes: newClasses })
  }

  const toggleArm = (sectionIndex, classIndex, armIndex) => {
    const section = sections[sectionIndex]
    const newClasses = [...section.classes]
    const arms = [...newClasses[classIndex].arms]
    arms[armIndex] = { ...arms[armIndex], selected: !arms[armIndex].selected }
    newClasses[classIndex] = { ...newClasses[classIndex], arms }
    updateSection(sectionIndex, { classes: newClasses })
  }

  const toggleSubject = (sectionIndex, subjectIndex) => {
    const section = sections[sectionIndex]
    const newSubjects = [...section.subjects]
    newSubjects[subjectIndex] = { ...newSubjects[subjectIndex], selected: !newSubjects[subjectIndex].selected }
    updateSection(sectionIndex, { subjects: newSubjects })
  }

  const addClass = (sectionIndex) => {
    const section = sections[sectionIndex]
    const nextSequence = section.classes.length + 1
    const newClass = {
      name: `Class ${nextSequence}`,
      sequence: nextSequence,
      selected: true,
      arms: [{ name: 'A', selected: true }],
      is_graduating_class: false
    }
    const newClasses = [...section.classes, newClass]
    updateSection(sectionIndex, { classes: newClasses })
    setAddingClassTo(null)
    setNewClassName('')
  }

  const addArm = (sectionIndex, classIndex) => {
    if (!newArmName.trim()) return
    const section = sections[sectionIndex]
    const newClasses = [...section.classes]
    const arms = [...newClasses[classIndex].arms]
    const newArm = { name: newArmName.trim(), selected: true }
    
    if (arms.some(arm => arm.name === newArmName.trim())) {
      alert('Arm name already exists for this class')
      return
    }
    
    arms.push(newArm)
    newClasses[classIndex] = { ...newClasses[classIndex], arms }
    updateSection(sectionIndex, { classes: newClasses })
    setAddingArmTo(null)
    setNewArmName('')
  }

  const handleNext = () => {
    if (sections.some(s => s.selected)) next()
    else alert('Please select at least one section')
  }

  return (
    <div className="step-form">
      <div className="step-header">
        <span className="step-number">Step 2 of 5</span>
        <h2>Choose your school structure</h2>
        <p>Select which sections your school offers. You can customize classes and arms below.</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
          💡 Subjects marked "Apply to All" will be automatically assigned to all students in that section.
          Optional subjects can be assigned individually later.
          You can also change all of this later.
        </p>
      </div>

      <div className="curriculum-sections">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className={`curriculum-section ${section.selected ? '' : 'collapsed'}`}>
            <div className="section-header">
              <label className="section-checkbox" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={section.selected}
                  onChange={() => toggleSection(sIdx)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="section-name">{section.name}</span>
              </label>
              <button
                className="btn-icon"
                onClick={() => setEditingSection(editingSection === sIdx ? null : sIdx)}
                title="Expand/Collapse"
              >
                {editingSection === sIdx ? '▼' : '▶'}
              </button>
            </div>

            {section.selected && editingSection === sIdx && (
              <div className="section-detail">
                {/* Default Assessments Section */}
                {section.default_assessments && section.default_assessments.length > 0 && (
                  <div className="assessments-list" style={{ marginBottom: '20px' }}>
                    <h4>Default Assessments</h4>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '12px' }}>
                      These assessments will be created for each term. You can modify them later in Academic Config.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {section.default_assessments.map((assessment, aIdx) => (
                        <div key={aIdx} style={{ 
                          background: '#f1f5f9', 
                          padding: '6px 12px', 
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ fontWeight: 600 }}>{assessment.name}</span>
                          <span style={{ color: '#0b29be' }}>({assessment.weight}%)</span>
                          <span style={{ color: '#64748b', fontSize: '0.7rem' }}>Max: {assessment.max_score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Classes Section */}
                <div className="classes-list">
                  <h4>Classes</h4>
                  {section.classes.map((cls, cIdx) => (
                    <div key={cIdx} className="class-item">
                      <label className="class-checkbox">
                        <input
                          type="checkbox"
                          checked={cls.selected}
                          onChange={() => toggleClass(sIdx, cIdx)}
                        />
                        <span className="class-name">{cls.name}</span>
                      </label>
                      <div className="arms-list">
                        {cls.arms.map((arm, aIdx) => (
                          <label key={aIdx} className="arm-checkbox">
                            <input
                              type="checkbox"
                              checked={arm.selected}
                              onChange={() => toggleArm(sIdx, cIdx, aIdx)}
                            />
                            <span>{arm.name}</span>
                          </label>
                        ))}
                        <button
                          className="btn-small"
                          onClick={() => setAddingArmTo({ section: sIdx, class: cIdx })}
                        >
                          + Arm
                        </button>
                        {addingArmTo && addingArmTo.section === sIdx && addingArmTo.class === cIdx && (
                          <div className="inline-add">
                            <input
                              type="text"
                              placeholder="e.g., D"
                              value={newArmName}
                              onChange={(e) => setNewArmName(e.target.value.toUpperCase())}
                            />
                            <button onClick={() => addArm(sIdx, cIdx)}>Add</button>
                            <button onClick={() => setAddingArmTo(null)}>Cancel</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {addingClassTo === sIdx ? (
                    <div className="inline-add">
                      <input
                        type="text"
                        placeholder="Class name"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        style={{border: "2px solid rgb(10, 130, 220)"}}
                      />
                      <button onClick={() => addClass(sIdx)}>Add</button>
                      <button onClick={() => setAddingClassTo(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="btn-small" onClick={() => setAddingClassTo(sIdx)}>
                      + Add Class
                    </button>
                  )}
                </div>

                {/* Subjects Section */}
                <div className="subjects-list">
                  <h4>Subjects</h4>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '12px' }}>
                    ✅ Checked subjects = automatically assigned to all students in this section.<br/>
                    ☐ Unchecked subjects = optional (can be assigned per student later).
                  </p>
                  {section.subjects.map((subj, subIdx) => (
                    <div key={subIdx} className="subject-item">
                      <label className="subject-checkbox">
                        <input
                          type="checkbox"
                          checked={subj.selected}
                          onChange={() => toggleSubject(sIdx, subIdx)}
                        />
                        <span className="subject-name">{subj.name}</span>
                      </label>
                      <span style={{ marginLeft: '12px', fontSize: '0.7rem', color: subj.apply_to_all ? '#16a34a' : '#64748b' }}>
                        {subj.apply_to_all ? '✓ Applies to all students' : '⚡ Optional'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  )
}
