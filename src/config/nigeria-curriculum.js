// config/nigeria-curriculum.js
export const nigeriaSchoolStructure = {
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
      name: "Pre-Primary",
      level: 0,
      classes: [
        { name: "Creche", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Nursery 1", sequence: 2, arms: ["A"], is_graduating: false },
        { name: "Nursery 2", sequence: 3, arms: ["A"], is_graduating: false },
        { name: "Kindergarten", sequence: 4, arms: ["A"], is_graduating: true }
      ],
      subjects: [
        { name: "Literacy", apply_to_all: true },
        { name: "Numeracy", apply_to_all: true },
        { name: "Creative Arts", apply_to_all: true },
        { name: "Social Habits", apply_to_all: true },
        { name: "Health Habits", apply_to_all: true },
        { name: "Christian Religious Studies", apply_to_all: false }
      ]
    },
    {
      name: "Primary",
      level: 1,
      classes: [
        { name: "Primary 1", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 2", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 3", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 4", sequence: 4, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 5", sequence: 5, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 6", sequence: 6, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "Mathematics", apply_to_all: true },
        { name: "English Studies", apply_to_all: true },
        { name: "Basic Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Quantitative Reasoning", apply_to_all: false },
        { name: "Verbal Reasoning", apply_to_all: false },
        { name: "Computer Studies", apply_to_all: false },
        { name: "Physical and Health Education", apply_to_all: false },
        { name: "Agricultural Science", apply_to_all: false },
        { name: "Christian Religious Studies", apply_to_all: false },
        { name: "Home Economics", apply_to_all: false }
      ]
    },
    {
      name: "Junior Secondary",
      level: 2,
      classes: [
        { name: "JSS 1", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "JSS 2", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "JSS 3", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Mathematics", apply_to_all: true },
        { name: "English Language", apply_to_all: true },
        { name: "Basic Science", apply_to_all: true },
        { name: "Basic Technology", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Business Studies", apply_to_all: true },
        { name: "Computer Studies", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Physical and Health Education", apply_to_all: false },
        { name: "Agricultural Science", apply_to_all: false },
        { name: "Christian Religious Studies", apply_to_all: false },
        { name: "Home Economics", apply_to_all: false }
      ]
    },
    {
      name: "Senior Secondary",
      level: 3,
      classes: [
        { name: "SSS 1", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "SSS 2", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "SSS 3", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Mathematics", apply_to_all: true },
        { name: "English Language", apply_to_all: true },
        { name: "Physics", apply_to_all: false },
        { name: "Chemistry", apply_to_all: false },
        { name: "Biology", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "Government", apply_to_all: false },
        { name: "Literature in English", apply_to_all: false },
        { name: "Data Processing", apply_to_all: false },
        { name: "Physical and Health Education", apply_to_all: false },
        { name: "Agricultural Science", apply_to_all: false },
        { name: "Christian Religious Studies", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "History", apply_to_all: false }
      ]
    }
  ]
}
