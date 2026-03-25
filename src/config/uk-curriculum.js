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
        { name: "Communication and Language", is_mandatory: true, components: [{ name: "Communication and Language", weight: 100 }] },
        { name: "Physical Development", is_mandatory: true, components: [{ name: "Physical Development", weight: 100 }] },
        { name: "Personal, Social and Emotional Development", is_mandatory: true, components: [{ name: "PSED", weight: 100 }] },
        { name: "Literacy", is_mandatory: true, components: [{ name: "Literacy", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Understanding the World", is_mandatory: true, components: [{ name: "Understanding the World", weight: 100 }] },
        { name: "Expressive Arts and Design", is_mandatory: true, components: [{ name: "Expressive Arts and Design", weight: 100 }] }
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
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science", is_mandatory: true, components: [{ name: "Science", weight: 100 }] },
        { name: "Art and Design", is_mandatory: false, components: [{ name: "Art and Design", weight: 100 }] },
        { name: "Computing", is_mandatory: false, components: [{ name: "Computing", weight: 100 }] },
        { name: "Design and Technology", is_mandatory: false, components: [{ name: "Design and Technology", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Music", is_mandatory: false, components: [{ name: "Music", weight: 100 }] },
        { name: "Physical Education", is_mandatory: true, components: [{ name: "Physical Education", weight: 100 }] }
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
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science", is_mandatory: true, components: [{ name: "Science", weight: 100 }] },
        { name: "Art and Design", is_mandatory: false, components: [{ name: "Art and Design", weight: 100 }] },
        { name: "Computing", is_mandatory: false, components: [{ name: "Computing", weight: 100 }] },
        { name: "Design and Technology", is_mandatory: false, components: [{ name: "Design and Technology", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Languages", is_mandatory: false, components: [{ name: "Languages", weight: 100 }] },
        { name: "Music", is_mandatory: false, components: [{ name: "Music", weight: 100 }] },
        { name: "Physical Education", is_mandatory: true, components: [{ name: "Physical Education", weight: 100 }] }
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
        { name: "English", is_mandatory: true, components: [{ name: "English", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science", is_mandatory: true, components: [{ name: "Biology", weight: 34 }, { name: "Chemistry", weight: 33 }, { name: "Physics", weight: 33 }] },
        { name: "Art and Design", is_mandatory: false, components: [{ name: "Art and Design", weight: 100 }] },
        { name: "Computing", is_mandatory: false, components: [{ name: "Computing", weight: 100 }] },
        { name: "Design and Technology", is_mandatory: false, components: [{ name: "Design and Technology", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Languages", is_mandatory: false, components: [{ name: "Languages", weight: 100 }] },
        { name: "Music", is_mandatory: false, components: [{ name: "Music", weight: 100 }] },
        { name: "Physical Education", is_mandatory: true, components: [{ name: "Physical Education", weight: 100 }] },
        { name: "Citizenship", is_mandatory: false, components: [{ name: "Citizenship", weight: 100 }] }
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
        { name: "English Language", is_mandatory: true, components: [{ name: "English Language", weight: 100 }] },
        { name: "English Literature", is_mandatory: true, components: [{ name: "English Literature", weight: 100 }] },
        { name: "Mathematics", is_mandatory: true, components: [{ name: "Mathematics", weight: 100 }] },
        { name: "Science (Combined)", is_mandatory: true, components: [{ name: "Biology", weight: 34 }, { name: "Chemistry", weight: 33 }, { name: "Physics", weight: 33 }] },
        { name: "Physics (Triple)", is_mandatory: false, components: [{ name: "Physics", weight: 100 }] },
        { name: "Chemistry (Triple)", is_mandatory: false, components: [{ name: "Chemistry", weight: 100 }] },
        { name: "Biology (Triple)", is_mandatory: false, components: [{ name: "Biology", weight: 100 }] },
        { name: "History", is_mandatory: false, components: [{ name: "History", weight: 100 }] },
        { name: "Geography", is_mandatory: false, components: [{ name: "Geography", weight: 100 }] },
        { name: "French", is_mandatory: false, components: [{ name: "French", weight: 100 }] },
        { name: "Spanish", is_mandatory: false, components: [{ name: "Spanish", weight: 100 }] },
        { name: "Computer Science", is_mandatory: false, components: [{ name: "Computer Science", weight: 100 }] },
        { name: "Business Studies", is_mandatory: false, components: [{ name: "Business Studies", weight: 100 }] },
        { name: "Economics", is_mandatory: false, components: [{ name: "Economics", weight: 100 }] },
        { name: "Art and Design", is_mandatory: false, components: [{ name: "Art and Design", weight: 100 }] },
        { name: "Physical Education", is_mandatory: true, components: [{ name: "Physical Education", weight: 100 }] }
      ]
    }
  ]
}
