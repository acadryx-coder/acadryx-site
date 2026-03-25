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
      name: "Pre-Primary",
      level: 1,
      classes: [
        { name: "Pre-Primary 1", sequence: 1, arms: ["A"], is_graduating: false },
        { name: "Pre-Primary 2", sequence: 2, arms: ["A"], is_graduating: true }
      ],
      subjects: [
        { name: "Language Activities", is_mandatory: true, components: [{ name: "Language Activities", weight: 100 }] },
        { name: "Mathematical Activities", is_mandatory: true, components: [{ name: "Mathematical Activities", weight: 100 }] },
        { name: "Environmental Activities", is_mandatory: true, components: [{ name: "Environmental Activities", weight: 100 }] },
        { name: "Psychomotor and Creative Activities", is_mandatory: true, components: [{ name: "Psychomotor and Creative Activities", weight: 100 }] },
        { name: "Religious Education", is_mandatory: false, components: [{ name: "Religious Education", weight: 100 }] }
      ]
    },
    {
      name: "Primary (CBC)",
      level: 2,
      classes: [
        { name: "Grade 1", sequence: 1, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 2", sequence: 2, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 3", sequence: 3, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 4", sequence: 4, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 5", sequence: 5, arms: ["A", "B"], is_graduating: false },
        { name: "Grade 6", sequence: 6, arms: ["A", "B"], is_graduating: true }
      ],
      subjects: [
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Kiswahili", is_mandatory: true, components: [{ name: "Kiswahili", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science and Technology", is_mandatory: true, components: [{ name: "Science and Technology", weight: 100 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "Religious Education", is_mandatory: false, components: [{ name: "Religious Education", weight: 100 }] },
        { name: "Creative Arts", is_mandatory: false, components: [{ name: "Creative Arts", weight: 100 }] },
        { name: "Physical and Health Education", is_mandatory: false, components: [{ name: "Physical and Health Education", weight: 100 }] }
      ]
    },
    {
      name: "Junior Secondary (CBC)",
      level: 3,
      classes: [
        { name: "Grade 7", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 8", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 9", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Kiswahili", is_mandatory: true, components: [{ name: "Kiswahili", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Integrated Science", is_mandatory: true, components: [{ name: "Biology", weight: 40 }, { name: "Chemistry", weight: 30 }, { name: "Physics", weight: 30 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "Religious Education", is_mandatory: false, components: [{ name: "Religious Education", weight: 100 }] },
        { name: "Business Studies", is_mandatory: false, components: [{ name: "Business Studies", weight: 100 }] },
        { name: "Agriculture", is_mandatory: false, components: [{ name: "Agriculture", weight: 100 }] },
        { name: "Computer Science", is_mandatory: false, components: [{ name: "Computer Science", weight: 100 }] },
        { name: "Physical Education", is_mandatory: false, components: [{ name: "Physical Education", weight: 100 }] },
        { name: "Visual Arts", is_mandatory: false, components: [{ name: "Visual Arts", weight: 100 }] },
        { name: "Performing Arts", is_mandatory: false, components: [{ name: "Performing Arts", weight: 100 }] }
      ]
    },
    {
      name: "Senior Secondary (CBC)",
      level: 4,
      classes: [
        { name: "Grade 10", sequence: 1, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 11", sequence: 2, arms: ["A", "B", "C"], is_graduating: false },
        { name: "Grade 12", sequence: 3, arms: ["A", "B", "C"], is_graduating: true }
      ],
      subjects: [
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Kiswahili", is_mandatory: true, components: [{ name: "Kiswahili", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Physics", is_mandatory: false, components: [{ name: "Physics", weight: 100 }] },
        { name: "Chemistry", is_mandatory: false, components: [{ name: "Chemistry", weight: 100 }] },
        { name: "Biology", is_mandatory: false, components: [{ name: "Biology", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "Economics", is_mandatory: false, components: [{ name: "Economics", weight: 100 }] },
        { name: "Business Studies", is_mandatory: false, components: [{ name: "Business Studies", weight: 100 }] },
        { name: "Computer Science", is_mandatory: false, components: [{ name: "Computer Science", weight: 100 }] },
        { name: "Agriculture", is_mandatory: false, components: [{ name: "Agriculture", weight: 100 }] },
        { name: "Religious Education", is_mandatory: false, components: [{ name: "Religious Education", weight: 100 }] }
      ]
    }
  ]
}
