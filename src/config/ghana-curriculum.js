// config/ghana-curriculum.js
export const ghanaSchoolStructure = {
  grading_defaults: [
    { min_score: 80, max_score: 100, grade: 'A', description: 'Excellent' },
    { min_score: 70, max_score: 79, grade: 'B', description: 'Very Good' },
    { min_score: 60, max_score: 69, grade: 'C', description: 'Good' },
    { min_score: 50, max_score: 59, grade: 'D', description: 'Credit' },
    { min_score: 40, max_score: 49, grade: 'E', description: 'Pass' },
    { min_score: 0, max_score: 39, grade: 'F', description: 'Fail' }
  ],
  sections: [
    {
      name: "Pre-Primary",
      level: 1,
      classes: [
        { name: "Nursery", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Kindergarten 1", sequence: 2, arms: ["A"], is_graduating: false },
        { name: "Kindergarten 2", sequence: 3, arms: ["A"], is_graduating: true }
      ],
      subjects: [
        { name: "Language and Literacy", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Creative Arts", apply_to_all: true },
        { name: "Our World", apply_to_all: true },
        { name: "Physical Development", apply_to_all: true }
      ]
    },
    {
      name: "Primary",
      level: 2,
      classes: [
        { name: "Primary 1", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 2", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 3", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 4", sequence: 4, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 5", sequence: 5, arms: ["A", "B"], is_graduating: false },
        { name: "Primary 6", sequence: 6, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Our World (Social Studies)", apply_to_all: true },
        { name: "Computing", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Religious and Moral Education", apply_to_all: false }
      ]
    },
    {
      name: "Junior High School",
      level: 3,
      classes: [
        { name: "JHS 1", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "JHS 2", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "JHS 3", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Integrated Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "ICT", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Religious and Moral Education", apply_to_all: false },
        { name: "Basic Design and Technology", apply_to_all: false }
      ]
    },
    {
      name: "Senior High School",
      level: 4,
      classes: [
        { name: "SHS 1", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "SHS 2", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "SHS 3", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Integrated Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Elective Mathematics", apply_to_all: false },
        { name: "Physics", apply_to_all: false },
        { name: "Chemistry", apply_to_all: false },
        { name: "Biology", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "Business Management", apply_to_all: false },
        { name: "Accounting", apply_to_all: false },
        { name: "ICT", apply_to_all: false },
        { name: "Government", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "Literature in English", apply_to_all: false }
      ]
    }
  ]
}
