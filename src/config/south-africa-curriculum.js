// config/south-africa-curriculum.js
export const southAfricaSchoolStructure = {
  grading_defaults: [
    { min_score: 80, max_score: 100, grade: 'A', description: 'Outstanding' },
    { min_score: 70, max_score: 79, grade: 'B', description: 'Meritorious' },
    { min_score: 60, max_score: 69, grade: 'C', description: 'Satisfactory' },
    { min_score: 50, max_score: 59, grade: 'D', description: 'Adequate' },
    { min_score: 40, max_score: 49, grade: 'E', description: 'Elementary' },
    { min_score: 0, max_score: 39, grade: 'F', description: 'Not Achieved' }
  ],
  sections: [
    {
      name: "Foundation Phase",
      level: 1,
      default_assessments: [
        { name: "Continuous Assessment", weight: 100, max_score: 100, display_order: 1 }
      ],
      classes: [
        { name: "Grade R", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Grade 1", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 2", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 3", sequence: 4, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", apply_to_all: true },
        { name: "First Additional Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Life Skills", apply_to_all: true }
      ]
    },
    {
      name: "Intermediate Phase",
      level: 2,
      default_assessments: [
        { name: "Class Test", weight: 25, max_score: 50, display_order: 1 },
        { name: "June Exam", weight: 35, max_score: 100, display_order: 2 },
        { name: "November Exam", weight: 40, max_score: 100, display_order: 3 }
      ],
      classes: [
        { name: "Grade 4", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 5", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 6", sequence: 3, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", apply_to_all: true },
        { name: "First Additional Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Natural Sciences and Technology", apply_to_all: true },
        { name: "Social Sciences", apply_to_all: true },
        { name: "Life Skills", apply_to_all: true }
      ]
    },
    {
      name: "Senior Phase",
      level: 3,
      default_assessments: [
        { name: "Class Test", weight: 25, max_score: 50, display_order: 1 },
        { name: "June Exam", weight: 35, max_score: 100, display_order: 2 },
        { name: "November Exam", weight: 40, max_score: 100, display_order: 3 }
      ],
      classes: [
        { name: "Grade 7", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 8", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 9", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", apply_to_all: true },
        { name: "First Additional Language", apply_to_all: true },
        { name: "Mathematics", apply_to_all: true },
        { name: "Natural Sciences", apply_to_all: true },
        { name: "Social Sciences", apply_to_all: true },
        { name: "Technology", apply_to_all: true },
        { name: "Economic and Management Sciences", apply_to_all: true },
        { name: "Life Orientation", apply_to_all: true },
        { name: "Creative Arts", apply_to_all: false }
      ]
    },
    {
      name: "FET Phase",
      level: 4,
      default_assessments: [
        { name: "School-Based Assessment", weight: 25, max_score: 100, display_order: 1 },
        { name: "Trial Exam", weight: 25, max_score: 100, display_order: 2 },
        { name: "Final Matric Exam", weight: 50, max_score: 100, display_order: 3 }
      ],
      classes: [
        { name: "Grade 10", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 11", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 12", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", apply_to_all: true },
        { name: "First Additional Language", apply_to_all: true },
        { name: "Life Orientation", apply_to_all: true },
        { name: "Mathematics", apply_to_all: false },
        { name: "Mathematical Literacy", apply_to_all: false },
        { name: "Physical Sciences", apply_to_all: false },
        { name: "Life Sciences", apply_to_all: false },
        { name: "History", apply_to_all: false },
        { name: "Geography", apply_to_all: false },
        { name: "Economics", apply_to_all: false },
        { name: "Business Studies", apply_to_all: false },
        { name: "Accounting", apply_to_all: false },
        { name: "Computer Applications Technology", apply_to_all: false },
        { name: "Information Technology", apply_to_all: false },
        { name: "Engineering Graphics and Design", apply_to_all: false },
        { name: "Civil Technology", apply_to_all: false },
        { name: "Electrical Technology", apply_to_all: false },
        { name: "Mechanical Technology", apply_to_all: false },
        { name: "Dramatic Arts", apply_to_all: false },
        { name: "Music", apply_to_all: false },
        { name: "Visual Arts", apply_to_all: false },
        { name: "Agricultural Sciences", apply_to_all: false },
        { name: "Agricultural Management Practices", apply_to_all: false },
        { name: "Agricultural Technology", apply_to_all: false }
      ]
    }
  ]
};
