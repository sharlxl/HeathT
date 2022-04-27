seedUsers = [
  {
    user_id: "1",
    name: "John",
    password: "test123",

    allergies: [
      {
        allergy_id: "2",
        name: "NSAIDS",
        date: "2007-04-25T15:40:50.776Z",
        symptoms: ["rashes", "diffculty in breathing"],
      },
    ],

    medical_conditions: [
      {
        condition_id: "3",
        condition: "Diabetes",
        date_of_diagnosis: "2007-04-25T15:40:50.776Z",
      },
      {
        condition_id: "100",
        condition: "Backpain",
        date_of_diagnosis: "2003-04-25T15:40:50.776Z",
      },
    ],

    records: [
      {
        record_id: "4",
        date: "2022-04-25T15:40:50.776Z",
        time: "2022-04-25T15:40:50.776Z",
        description:
          "Pain over my right wrist, caught a pretty hard pass from my friend, the angle of my catch might be off",
        pain_score: "mild pain",
        trigger: "after playing basketball",
      },
      {
        record_id: "5",
        date: "2022-04-27T15:40:50.776Z",
        time: "2022-04-27T15:40:50.776Z",
        description: "Right wrist throbbing intermittently",
        pain_score: "mild pain",
        trigger: "While using computer",
      },
      {
        record_id: "6",
        date: "2022-04-30T15:40:50.776Z",
        time: "2022-04-30T15:40:50.776Z",
        description:
          "sudden sharp pain on my right wrist, woke me up from sleep",
        pain_score: "severe pain",
        trigger: "While sleeping",
      },
      {
        record_id: "7",
        date: "2022-05-01T15:40:50.776Z",
        time: "2022-05-01T15:40:50.776Z",
        description:
          "consistent dull aching pain on right wrist, sharp pain when pressure applied.",
        pain_score: "moderate pain",
        trigger: "no trigger, occurs consistently",
      },
    ],
  },
];

module.exports = seedUsers;
