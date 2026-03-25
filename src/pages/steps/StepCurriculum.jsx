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

  const toggleComponent = (sectionIndex, subjectIndex, compIndex) => {
    const section = sections[sectionIndex]
    const newSubjects = [...section.subjects]
    const components = [...newSubjects[subjectIndex].components]
    components[compIndex] = { ...components[compIndex], selected: !components[compIndex].selected }
    newSubjects[subjectIndex] = { ...newSubjects[subjectIndex], components }
    updateSection(sectionIndex, { subjects: newSubjects })
  }

  const addClass = (sectionIndex) => {
    const section = sections[sectionIndex]
    const nextSequence = section.classes.length + 1
    const newClass = {
      name: `Class ${nextSequence}`,
      sequence: nextSequence,
      selected: true,
      arms: [{ name: 'A', selected: true }]
    }
    const newClasses = [...section.classes, newClass]
    updateSection(sectionIndex, { classes: newClasses })
    setAddingClassTo(null)
    setNewClassName('')
  }

  /*const addArm = (sectionIndex, classIndex) => {
    const section = sections[sectionIndex]
    const newClasses = [...section.classes]
    const arms = [...newClasses[classIndex].arms]
    const nextLetter = String.fromCharCode(65 + arms.length) // A, B, C...
    const newArm = { name: nextLetter, selected: true }
    arms.push(newArm)
    newClasses[classIndex] = { ...newClasses[classIndex], arms }
    updateSection(sectionIndex, { classes: newClasses })
    setAddingArmTo(null)
    setNewArmName('')
  }*/

  const addArm = (sectionIndex, classIndex) => {
    if (!newArmName.trim()) return
    const section = sections[sectionIndex]
    const newClasses = [...section.classes]
    const arms = [...newClasses[classIndex].arms]
    const newArm = { name: newArmName.trim(), selected: true }
    
    // Check for duplicate arm name
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

                <div className="subjects-list">
                  <h4>Subjects</h4>
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
                      {subj.components.length > 1 && (
                      <>
                        <div className="components-note" style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>
                          ℹ️ Subject components (e.g., Biology 40%, Chemistry 30%, Physics 30%) can be edited or deleted later in School Settings.
                        </div>
                        <div className="components-list">
                          {subj.components.map((comp, compIdx) => (
                            <label key={compIdx} className="component-checkbox">
                              <input
                                type="checkbox"
                                checked={comp.selected}
                                onChange={() => toggleComponent(sIdx, subIdx, compIdx)}
                                style={{display: "none"}}
                              />
                              <span>{comp.name} ({comp.weight}%)</span>
                            </label>
                          ))}
                        </div>
                      </>
                      )}
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
