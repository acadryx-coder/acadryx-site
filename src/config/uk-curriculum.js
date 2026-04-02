// config/uk-curriculum.js
export const ukSchoolStructure = {
  grading_defaults: [
    { min_score: 90, max_score: 100, grade: 'A*', description: 'Exceptional' },
    { min_score: 80, max_score: 89, grade: 'A', description: 'Excellent' },
    { min_score: 70, max_score: 79, grade: 'B', description: 'Very Good' },
    { min_score: 60, max_score: 69, grade: 'C', description: 'Good' },
    { min_score: 50, max_score: 59, grade: 'D', description: 'Pass' },
    { min_score: 40, max_score: 49, grade: 'E', description: 'Marginal Pass' },
    { min_score: 0, max_score: 39, grade: 'U', description: 'Ungraded/Fail' }
  ],
  sections: [
    {
      name: "Early Years Foundation Stage",
      level: 1,
      classes: [
        { name: "Nursery", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Reception", sequence: 2, arms: ["A"], is_graduating: true }
      ],
      subjects: [
        { name: "Communication and Language", apply_to_all: true },
        { name: "Physical Development", apply_to_all: true },
        { name: "Personal, Social and Emotional Development", apply_to_all: true },
        { name: "Literacy", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Understanding the World", apply_to_all: true },
        { name: "Expressive Arts and Design", apply_to_all: true }
      ]
    },
    {
      name: "Key Stage 1",
      level: 2,
      classes: [
        { name: "Year 1", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Year 2", sequence: 2, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Art and Design", apply_to_all: false },
        { name: "Computing", apply_to_all: false },
        { name: "Design and Technology", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Music", apply_to_all: false }
      ]
    },
    {
      name: "Key Stage 2",
      level: 3,
      classes: [
        { name: "Year 3", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Year 4", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Year 5", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Year 6", sequence: 4, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Art and Design", apply_to_all: false },
        { name: "Computing", apply_to_all: false },
        { name: "Design and Technology", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Languages", apply_to_all: false },
        { name: "Music", apply_to_all: false }
      ]
    },
    {
      name: "Key Stage 3",
      level: 4,
      classes: [
        { name: "Year 7", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Year 8", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Year 9", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Art and Design", apply_to_all: false },
        { name: "Computing", apply_to_all: false },
        { name: "Design and Technology", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Languages", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Citizenship", apply_to_all: false }
      ]
    },
    {
      name: "Key Stage 4",
      level: 5,
      classes: [
        { name: "Year 10", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Year 11", sequence: 2, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language", apply_to_all: true },
        { name: "English Literature", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science (Combined)", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Physics (Triple)", apply_to_all: false },
        { name: "Chemistry (Triple)", apply_to_all: false },
        { name: "Biology (Triple)", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "Spanish", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false },
        { name: "Business Studies", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "Art and Design", apply_to_all: false }
      ]
    }
  ]
}
