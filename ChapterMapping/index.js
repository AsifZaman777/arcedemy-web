const data = [
  {
    id: 1,
    curriculum: "Cambridge",
    createdBy: "Admin",
    modifiedBy: "Sadman Sakib",
    levels: [
      {
        id: 1,
        level: "AS-Level",
        subjects: [
          {
            id: 1,
            subject: "Mathematics",
            chapters: [
              { id: 1, chapter: "Algebra" },
              { id: 2, chapter: "Calculus" },
            ],
          },
        ],
      },
    ],
  },
];
data.forEach((data) => {
  console.log(data);
});

const newLevels = [
  {
    id: 1,
    level: "AS-Level",
  },
  {
    id: 2,
    level: "AS-Level",
  },
  {
    id: 3,
    level: "AS-Level",
  },
  {
    id: 4,
    level: "AS-Level",
  },
];
//add new curriculum
const newCurriculum = {
  id: 2,
  curriculum: "Edexcel",
  createdBy: "Admin",
  modifiedBy: "Admin",
  levels: [...newLevels],
};

data.push(newCurriculum);

//Add a New Subject to a Specific Level

const targetCurriculum = data.find((c) => c.curriculum === "Cambridge");
const targetLevel = targetCurriculum.levels.find((l) => l.level === "AS-Level");

const newSubject = {
  id: 2,
  subject: "Physics",
};

targetLevel.subjects.push(newSubject);

//add a new chapter
const subject = targetLevel.subjects.find((s) => s.subject === "Mathematics");
subject.chapters.push({ id: 3, chapter: "Trigonometry" });

data.forEach((curriculum) => {
  curriculum.levels?.forEach((level) => {
    level.subjects?.forEach((subject) => {
      subject.chapters?.forEach((chapter) => {
        console.log(chapter);
      });
    });
  });
});
