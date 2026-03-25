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
        { name: "Language and Literacy", is_mandatory: true, components: [{ name: "Language and Literacy", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Creative Arts", is_mandatory: true, components: [{ name: "Creative Arts", weight: 100 }] },
        { name: "Our World", is_mandatory: true, components: [{ name: "Our World", weight: 100 }] },
        { name: "Physical Development", is_mandatory: true, components: [{ name: "Physical Development", weight: 100 }] }
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
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science", is_mandatory: true, components: [{ name: "Science", weight: 100 }] },
        { name: "Our World (Social Studies)", is_mandatory: true, components: [{ name: "Our World", weight: 100 }] },
        { name: "Computing", is_mandatory: false, components: [{ name: "Computing", weight: 100 }] },
        { name: "French", is_mandatory: false, components: [{ name: "French", weight: 100 }] },
        { name: "Religious and Moral Education", is_mandatory: false, components: [{ name: "Religious and Moral Education", weight: 100 }] }
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
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Integrated Science", is_mandatory: true, components: [{ name: "Biology", weight: 40 }, { name: "Chemistry", weight: 30 }, { name: "Physics", weight: 30 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "ICT", is_mandatory: false, components: [{ name: "ICT", weight: 100 }] },
        { name: "French", is_mandatory: false, components: [{ name: "French", weight: 100 }] },
        { name: "Religious and Moral Education", is_mandatory: false, components: [{ name: "Religious and Moral Education", weight: 100 }] },
        { name: "Basic Design and Technology", is_mandatory: false, components: [{ name: "Basic Design and Technology", weight: 100 }] }
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
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Integrated Science", is_mandatory: true, components: [{ name: "Biology", weight: 40 }, { name: "Chemistry", weight: 30 }, { name: "Physics", weight: 30 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "Elective Mathematics", is_mandatory: false, components: [{ name: "Elective Mathematics", weight: 100 }] },
        { name: "Physics", is_mandatory: false, components: [{ name: "Physics", weight: 100 }] },
        { name: "Chemistry", is_mandatory: false, components: [{ name: "Chemistry", weight: 100 }] },
        { name: "Biology", is_mandatory: false, components: [{ name: "Biology", weight: 100 }] },
        { name: "Economics", is_mandatory: false, components: [{ name: "Economics", weight: 100 }] },
        { name: "Business Management", is_mandatory: false, components: [{ name: "Business Management", weight: 100 }] },
        { name: "Accounting", is_mandatory: false, components: [{ name: "Accounting", weight: 100 }] },
        { name: "ICT", is_mandatory: false, components: [{ name: "ICT", weight: 100 }] },
        { name: "Government", is_mandatory: false, components: [{ name: "Government", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "Literature in English", is_mandatory: false, components: [{ name: "Literature in English", weight: 100 }] }
      ]
    }
  ]
}
