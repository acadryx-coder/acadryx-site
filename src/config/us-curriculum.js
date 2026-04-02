// config/us-curriculum.js
export const usSchoolStructure = {
  grading_defaults: [
    { min_score: 90, max_score: 100, grade: 'A', description: 'Excellent' },
    { min_score: 80, max_score: 89, grade: 'B', description: 'Good' },
    { min_score: 70, max_score: 79, grade: 'C', description: 'Satisfactory' },
    { min_score: 60, max_score: 69, grade: 'D', description: 'Passing' },
    { min_score: 0, max_score: 59, grade: 'F', description: 'Failing' }
  ],
  sections: [
    {
      name: "Elementary School",
      level: 1,
      classes: [
        { name: "Kindergarten", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Grade 1", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 2", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 3", sequence: 4, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 4", sequence: 5, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 5", sequence: 6, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language Arts", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Art", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false }
      ]
    },
    {
      name: "Middle School",
      level: 2,
      classes: [
        { name: "Grade 6", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 7", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 8", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English Language Arts", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Science", apply_to_all: true },
        { name: "Social Studies", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Health", apply_to_all: true },
        { name: "Art", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false },
        { name: "Spanish", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "STEM", apply_to_all: false }
      ]
    },
    {
      name: "High School",
      level: 3,
      classes: [
        { name: "Grade 9 (Freshman)", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 10 (Sophomore)", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 11 (Junior)", sequence: 3, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 12 (Senior)", sequence: 4, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Physical Education", apply_to_all: true },
        { name: "Health", apply_to_all: true },
        { name: "Algebra I", apply_to_all: false },
        { name: "Geometry", apply_to_all: false },
        { name: "Algebra II", apply_to_all: false },
        { name: "Pre-Calculus", apply_to_all: false },
        { name: "Calculus", apply_to_all: false },
        { name: "AP Calculus AB", apply_to_all: false },
        { name: "AP Calculus BC", apply_to_all: false },
        { name: "Statistics", apply_to_all: false },
        { name: "AP Statistics", apply_to_all: false },
        { name: "Biology", apply_to_all: false },
        { name: "Chemistry", apply_to_all: false },
        { name: "Physics", apply_to_all: false },
        { name: "AP Biology", apply_to_all: false },
        { name: "AP Chemistry", apply_to_all: false },
        { name: "AP Physics", apply_to_all: false },
        { name: "Environmental Science", apply_to_all: false },
        { name: "World History", apply_to_all: false },
        { name: "US History", apply_to_all: false },
        { name: "Government", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "AP US History", apply_to_all: false },
        { name: "AP Government", apply_to_all: false },
        { name: "Psychology", apply_to_all: false },
        { name: "AP Psychology", apply_to_all: false },
        { name: "Spanish", apply_to_all: false },
        { name: "French", apply_to_all: false },
        { name: "German", apply_to_all: false },
        { name: "Latin", apply_to_all: false },
        { name: "Mandarin", apply_to_all: false },
        { name: "Computer Science", apply_to_all: false },
        { name: "AP Computer Science", apply_to_all: false },
        { name: "Business", apply_to_all: false },
        { name: "Marketing", apply_to_all: false },
        { name: "Accounting", apply_to_all: false },
        { name: "Art", apply_to_all: false },
        { name: "AP Art", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Band", apply_to_all: false },
        { name: "Choir", apply_to_all: false },
        { name: "Drama", apply_to_all: false },
        { name: "Journalism", apply_to_all: false },
        { name: "Yearbook", apply_to_all: false },
        { name: "Speech and Debate", apply_to_all: false }
      ]
    }
  ]
}
