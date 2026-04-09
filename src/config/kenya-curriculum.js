// config/kenya-curriculum.js
export const kenyaSchoolStructure = {
  grading_defaults: [
    { min_score: 75, max_score: 100, grade: 'A', description: 'Excellent' },
    { min_score: 70, max_score: 74, grade: 'B', description: 'Very Good' },
    { min_score: 65, max_score: 69, grade: 'C', description: 'Good' },
    { min_score: 60, max_score: 64, grade: 'D', description: 'Credit' },
    { min_score: 50, max_score: 59, grade: 'E', description: 'Pass' },
    { min_score: 0, max_score: 49, grade: 'F', description: 'Fail' }
  ],
  sections: [
    {
      name: "Pre-Primary (Early Years)",
      level: 1,
      default_assessments: [
        { name: "Observation Checklist", weight: 100, max_score: 100, display_order: 1 }
      ],
      classes: [
        { name: "Pre-Primary 1", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Pre-Primary 2", sequence: 2, arms: ["A"], is_graduating: true }
      ],
      subjects: [
        { name: "Language Activities (English)", apply_to_all: true },
        { name: "Kiswahili Language Activities", apply_to_all: true },
        { name: "Mathematical Activities", apply_to_all: true },
        { name: "Environmental Activities", apply_to_all: true },
        { name: "Psychomotor and Creative Activities", apply_to_all: true },
        { name: "Religious Education", apply_to_all: false }
      ]
    },
    {
      name: "Primary (Middle School)",
      level: 2,
      default_assessments: [
        { name: "Formative Assessment", weight: 30, max_score: 30, display_order: 1 },
        { name: "Summative Assessment", weight: 70, max_score: 70, display_order: 2 }
      ],
      classes: [
        { name: "Grade 1", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 2", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 3", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 4", sequence: 4, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 5", sequence: 5, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 6", sequence: 6, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Kiswahili", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science and Technology", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Agriculture and Nutrition", apply_to_all: true },
        { name: "Creative Arts", apply_to_all: true },
        { name: "Physical and Health Education", apply_to_all: true },
        { name: "Religious Education", apply_to_all: false },
        { name: "Indigenous Languages", apply_to_all: false }
      ]
    },
    {
      name: "Junior Secondary",
      level: 3,
      default_assessments: [
        { name: "Formative Assessment", weight: 30, max_score: 30, display_order: 1 },
        { name: "Summative Assessment", weight: 70, max_score: 70, display_order: 2 }
      ],
      classes: [
        { name: "Grade 7", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 8", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 9", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Kiswahili", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Integrated Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Religious Education", apply_to_all: true },
        { name: "Business Studies", apply_to_all: false },
        { name: "Agriculture", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false },
        { name: "Physical Education", apply_to_all: false },
        { name: "Visual Arts", apply_to_all: false },
        { name: "Performing Arts", apply_to_all: false },
        { name: "Life Skills", apply_to_all: false },
        { name: "Indigenous Languages", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Arabic", apply_to_all: false }
      ]
    },
    {
      name: "Senior Secondary (Pre-Professional)",
      level: 4,
      default_assessments: [
        { name: "Continuous Assessment", weight: 30, max_score: 100, display_order: 1 },
        { name: "KCSE Mock", weight: 20, max_score: 100, display_order: 2 },
        { name: "KCSE Final", weight: 50, max_score: 100, display_order: 3 }
      ],
      classes: [
        { name: "Grade 10", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 11", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 12", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Kiswahili", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Physics", apply_to_all: false },
        { name: "Chemistry", apply_to_all: false },
        { name: "Biology", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "Business Studies", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false },
        { name: "Agriculture", apply_to_all: false },
        { name: "Religious Education", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Art and Design", apply_to_all: false }
      ]
    }
  ]
};
