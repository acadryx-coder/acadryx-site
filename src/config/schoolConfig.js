// schoolConfig.js
// Default templates for school types.
// These populate the wizard and get sent to create_complete_school_structure()
// Schools own their data — this is just the starting template.

export const SCHOOL_TYPE_CONFIG = {
  pre_nursery: {
    name: 'Pre-Nursery',
    label: 'Pre-Nursery / Crèche',
    icon: '🍼',
    sections: [
      {
        name: 'Pre-Nursery Section',
        classes: ['Pre-Nursery 1', 'Pre-Nursery 2'],
        arms: ['A', 'B', 'C'],
      },
    ],
    subjects: {
      Rhymes: [{ name: 'Rhymes', weight: 100 }],
      Play: [{ name: 'Play', weight: 100 }],
      'Basic Math': [{ name: 'Basic Math', weight: 100 }],
      'Verbal Reasoning': [{ name: 'Verbal Reasoning', weight: 100 }],
      'Drawing & Colours': [{ name: 'Drawing & Colours', weight: 100 }],
      'Hand Writing': [{ name: 'Hand Writing', weight: 100 }],
    },
  },

  nursery: {
    name: 'Nursery',
    label: 'Nursery School',
    icon: '🌱',
    sections: [
      {
        name: 'Nursery Section',
        classes: ['Nursery 1', 'Nursery 2'],
        arms: ['A', 'B', 'C'],
      },
    ],
    subjects: {
      Mathematics: [{ name: 'Mathematics', weight: 100 }],
      'English Language': [{ name: 'English Language', weight: 100 }],
      'Quantitative Reasoning': [{ name: 'Quantitative Reasoning', weight: 100 }],
      'Verbal Reasoning': [{ name: 'Verbal Reasoning', weight: 100 }],
      'Basic Science': [{ name: 'Basic Science', weight: 100 }],
      'Social Studies': [{ name: 'Social Studies', weight: 100 }],
      'Cultural & Creative Arts': [{ name: 'Cultural & Creative Arts', weight: 100 }],
    },
  },

  primary: {
    name: 'Primary',
    label: 'Primary School',
    icon: '📚',
    sections: [
      {
        name: 'Primary Section',
        classes: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
        arms: ['A', 'B', 'C'],
      },
    ],
    subjects: {
      Mathematics: [
        { name: 'Arithmetic', weight: 50 },
        { name: 'Geometry', weight: 50 },
      ],
      'English Language': [
        { name: 'Comprehension', weight: 30 },
        { name: 'Composition', weight: 40 },
        { name: 'Literature', weight: 30 },
      ],
      'Basic Science': [{ name: 'Basic Science', weight: 100 }],
      'Social Studies': [{ name: 'Social Studies', weight: 100 }],
      'Quantitative Reasoning': [{ name: 'Quantitative Reasoning', weight: 100 }],
      'Verbal Reasoning': [{ name: 'Verbal Reasoning', weight: 100 }],
      'National Values': [{ name: 'National Values', weight: 100 }],
      'Cultural & Creative Arts': [{ name: 'Cultural & Creative Arts', weight: 100 }],
      'Physical & Health Education': [{ name: 'Physical & Health Education', weight: 100 }],
      'Computer Studies': [{ name: 'Computer Studies', weight: 100 }],
    },
  },

  secondary: {
    name: 'Secondary',
    label: 'Secondary School',
    icon: '🎓',
    sections: [
      {
        name: 'Junior Secondary Section',
        classes: ['JSS1', 'JSS2', 'JSS3'],
        arms: ['A', 'B', 'C'],
      },
      {
        name: 'Senior Secondary Section',
        classes: ['SS1', 'SS2', 'SS3'],
        arms: ['A', 'B', 'C'],
      },
    ],
    subjects: {
      Mathematics: [
        { name: 'Algebra', weight: 40 },
        { name: 'Geometry', weight: 35 },
        { name: 'Statistics', weight: 25 },
      ],
      'English Language': [
        { name: 'Comprehension', weight: 30 },
        { name: 'Essay Writing', weight: 40 },
        { name: 'Literature', weight: 30 },
      ],
      Physics: [{ name: 'Physics', weight: 100 }],
      Chemistry: [{ name: 'Chemistry', weight: 100 }],
      Biology: [{ name: 'Biology', weight: 100 }],
      'Further Mathematics': [{ name: 'Further Mathematics', weight: 100 }],
      Economics: [{ name: 'Economics', weight: 100 }],
      Government: [{ name: 'Government', weight: 100 }],
      Geography: [{ name: 'Geography', weight: 100 }],
      'Christian Religious Studies': [{ name: 'Christian Religious Studies', weight: 100 }],
      'Islamic Religious Studies': [{ name: 'Islamic Religious Studies', weight: 100 }],
      'Computer Studies': [{ name: 'Computer Studies', weight: 100 }],
      'Agricultural Science': [{ name: 'Agricultural Science', weight: 100 }],
    },
  },
}

// Display order
export const SCHOOL_TYPES_ORDER = ['pre_nursery', 'nursery', 'primary', 'secondary']

// Deep clone a type's default sections (so edits don't mutate config)
export function getDefaultSections(typeKey) {
  return JSON.parse(JSON.stringify(SCHOOL_TYPE_CONFIG[typeKey].sections))
}

// Build the p_structure JSON array expected by create_complete_school_structure()
export function buildStructurePayload(selectedTypes, editedSections) {
  return SCHOOL_TYPES_ORDER.filter((t) => selectedTypes.includes(t)).map((type) => ({
    type,
    sections: editedSections[type] || getDefaultSections(type),
    subjects: SCHOOL_TYPE_CONFIG[type].subjects,
  }))
}
