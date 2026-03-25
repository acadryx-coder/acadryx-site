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
      classes: [
        { name: "Grade R", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Grade 1", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 2", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 3", sequence: 4, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", is_mandatory: true, components: [{ name: "Home Language", weight: 100 }] },
        { name: "First Additional Language", is_mandatory: true, components: [{ name: "First Additional Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Life Skills", is_mandatory: true, components: [{ name: "Life Skills", weight: 100 }] }
      ]
    },
    {
      name: "Intermediate Phase",
      level: 2,
      classes: [
        { name: "Grade 4", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 5", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 6", sequence: 3, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", is_mandatory: true, components: [{ name: "Home Language", weight: 100 }] },
        { name: "First Additional Language", is_mandatory: true, components: [{ name: "First Additional Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Natural Sciences and Technology", is_mandatory: true, components: [{ name: "Natural Sciences", weight: 70 }, { name: "Technology", weight: 30 }] },
        { name: "Social Sciences", is_mandatory: true, components: [{ name: "History", weight: 50 }, { name: "Geography", weight: 50 }] },
        { name: "Life Skills", is_mandatory: true, components: [{ name: "Life Skills", weight: 100 }] }
      ]
    },
    {
      name: "Senior Phase",
      level: 3,
      classes: [
        { name: "Grade 7", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 8", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 9", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", is_mandatory: true, components: [{ name: "Home Language", weight: 100 }] },
        { name: "First Additional Language", is_mandatory: true, components: [{ name: "First Additional Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Natural Sciences", is_mandatory: true, components: [{ name: "Biology", weight: 50 }, { name: "Chemistry", weight: 50 }] },
        { name: "Social Sciences", is_mandatory: true, components: [{ name: "History", weight: 50 }, { name: "Geography", weight: 50 }] },
        { name: "Technology", is_mandatory: true, components: [{ name: "Technology", weight: 100 }] },
        { name: "Economic and Management Sciences", is_mandatory: true, components: [{ name: "Economics", weight: 50 }, { name: "Business Studies", weight: 50 }] },
        { name: "Life Orientation", is_mandatory: true, components: [{ name: "Life Orientation", weight: 100 }] },
        { name: "Creative Arts", is_mandatory: false, components: [{ name: "Creative Arts", weight: 100 }] }
      ]
    },
    {
      name: "FET Phase",
      level: 4,
      classes: [
        { name: "Grade 10", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 11", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 12", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "Home Language", is_mandatory: true, components: [{ name: "Home Language", weight: 100 }] },
        { name: "First Additional Language", is_mandatory: true, components: [{ name: "First Additional Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: false, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Mathematical Literacy", is_mandatory: false, components: [{ name: "Mathematical Literacy", weight: 100 }] },
        { name: "Life Orientation", is_mandatory: true, components: [{ name: "Life Orientation", weight: 100 }] },
        { name: "Physical Sciences", is_mandatory: false, components: [{ name: "Physics", weight: 50 }, { name: "Chemistry", weight: 50 }] },
        { name: "Life Sciences", is_mandatory: false, components: [{ name: "Life Sciences", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "Economics", is_mandatory: false, components: [{ name: "Economics", weight: 100 }] },
        { name: "Business Studies", is_mandatory: false, components: [{ name: "Business Studies", weight: 100 }] },
        { name: "Accounting", is_mandatory: false, components: [{ name: "Accounting", weight: 100 }] },
        { name: "Computer Applications Technology", is_mandatory: false, components: [{ name: "Computer Applications Technology", weight: 100 }] },
        { name: "Information Technology", is_mandatory: false, components: [{ name: "Information Technology", weight: 100 }] }
      ]
    }
  ]
}
