// src/pages/school/tabs/AcademicTab.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AcademicTab({ schoolId, branchId }) {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAcademicStructure()
  }, [schoolId])

  async function loadAcademicStructure() {
    const { data } = await supabase
      .schema('schools')
      .from('school_sections')
      .select(`
        id,
        name,
        level,
        classes:school_classes(
          id,
          name,
          sequence,
          is_graduating_class,
          arms:school_class_arms(id, name)
        )
      `)
      .eq('school_id', schoolId)
      .order('level')
    
    setSections(data || [])
    setLoading(false)
  }

  if (loading) return <div className="loading-placeholder">Loading academic structure...</div>

  return (
    <div className="academic-tab">
      <div className="academic-header">
        <h2>Sections & Classes</h2>
        <button className="btn-outline-sm">Edit Structure</button>
      </div>
      
      {sections.map(section => (
        <div key={section.id} className="section-card">
          <div className="section-header">
            <h3>{section.name}</h3>
            {section.classes.some(c => c.is_graduating_class) && (
              <span className="graduation-badge">Graduating Section</span>
            )}
          </div>
          <div className="classes-grid">
            {section.classes.map(cls => (
              <div key={cls.id} className="class-card">
                <div className="class-name">
                  {cls.name}
                  {cls.is_graduating_class && <span className="grad-icon">🎓</span>}
                </div>
                <div className="class-arms">
                  Arms: {cls.arms?.map(a => a.name).join(', ') || 'None'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="academic-note">
        💡 You can add, remove, and customize sections, classes, and arms from School Settings.
      </div>
    </div>
  )
}