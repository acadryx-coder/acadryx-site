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
        { name: "Literacy", is_mandatory: true, components: [{ name: "Literacy", weight: 100 }] },
        { name: "Numeracy", is_mandatory: true, components: [{ name: "Numeracy", weight: 100 }] },
        { name: "Creative Arts", is_mandatory: true, components: [{ name: "Creative Arts", weight: 100 }] },
        { name: "Social Habits", is_mandatory: true, components: [{ name: "Social Habits", weight: 100 }] },
        { name: "Health Habits", is_mandatory: true, components: [{ name: "Health Habits", weight: 100 }] },
        { name: "Christian Religious Studies", is_mandatory: false, components: [{ name: "Christian Religious Studies", weight: 100 }] }
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
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "English Studies", is_mandatory: true, components: [{ name: "English Studies", weight: 100 }] },
        { name: "Basic Science", is_mandatory: true, components: [{ name: "Basic Science", weight: 100 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "Quantitative Reasoning", is_mandatory: false, components: [{ name: "Quantitative Reasoning", weight: 100 }] },
        { name: "Verbal Reasoning", is_mandatory: false, components: [{ name: "Verbal Reasoning", weight: 100 }] },
        { name: "Computer Studies", is_mandatory: false, components: [{ name: "Computer Studies", weight: 100 }] },
        { name: "Physical and Health Education", is_mandatory: false, components: [{ name: "Physical and Health Education", weight: 100 }] },
        { name: "Agricultural Science", is_mandatory: false, components: [{ name: "Agricultural Science", weight: 100 }] },
        { name: "Christian Religious Studies", is_mandatory: false, components: [{ name: "Christian Religious Studies", weight: 100 }] },
        { name: "Home Economics", is_mandatory: false, components: [{ name: "Home Economics", weight: 100 }] }
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
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "Basic Science", is_mandatory: true, components: [{ name: "Biology", weight: 40 }, { name: "Chemistry", weight: 30 }, { name: "Physics", weight: 30 }] },
        { name: "Basic Technology", is_mandatory: true, components: [{ name: "Basic Technology", weight: 100 }] },
        { name: "Social Studies", is_mandatory: true, components: [{ name: "Social Studies", weight: 100 }] },
        { name: "Business Studies", is_mandatory: true, components: [{ name: "Business Studies", weight: 100 }] },
        { name: "Computer Studies", is_mandatory: false, components: [{ name: "Computer Studies", weight: 100 }] },
        { name: "French", is_mandatory: false, components: [{ name: "French", weight: 100 }] },
        { name: "Physical and Health Education", is_mandatory: false, components: [{ name: "Physical and Health Education", weight: 100 }] },
        { name: "Agricultural Science", is_mandatory: false, components: [{ name: "Agricultural Science", weight: 100 }] },
        { name: "Christian Religious Studies", is_mandatory: false, components: [{ name: "Christian Religious Studies", weight: 100 }] },
        { name: "Home Economics", is_mandatory: false, components: [{ name: "Home Economics", weight: 100 }] }
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
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "Physics", is_mandatory: false, components: [{ name: "Mechanics", weight: 40 }, { name: "Waves & Optics", weight: 20 }, { name: "Electricity & Magnetism", weight: 20 }, { name: "Modern Physics", weight: 20 }] },
        { name: "Chemistry", is_mandatory: false, components: [{ name: "Physical Chemistry", weight: 40 }, { name: "Organic Chemistry", weight: 35 }, { name: "Inorganic Chemistry", weight: 25 }] },
        { name: "Biology", is_mandatory: false, components: [{ name: "Botany", weight: 40 }, { name: "Zoology", weight: 40 }, { name: "Ecology", weight: 20 }] },
        { name: "Economics", is_mandatory: false, components: [{ name: "Microeconomics", weight: 50 }, { name: "Macroeconomics", weight: 50 }] },
        { name: "Government", is_mandatory: false, components: [{ name: "Government", weight: 100 }] },
        { name: "Literature in English", is_mandatory: false, components: [{ name: "Prose", weight: 40 }, { name: "Poetry", weight: 30 }, { name: "Drama", weight: 30 }] },
        { name: "Data Processing", is_mandatory: false, components: [{ name: "Data Processing", weight: 100 }] },
        { name: "Physical and Health Education", is_mandatory: false, components: [{ name: "Physical and Health Education", weight: 100 }] },
        { name: "Agricultural Science", is_mandatory: false, components: [{ name: "Agricultural Science", weight: 100 }] },
        { name: "Christian Religious Studies", is_mandatory: false, components: [{ name: "Christian Religious Studies", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Physical Geography", weight: 40 }, { name: "Human Geography", weight: 35 }, { name: "Map Reading", weight: 25 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] }
      ]
    }
  ]
}
