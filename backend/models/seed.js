seedUsers = [
  {
    user_id: "1",
    name: "John",
    password: "test1234",

    allergies: [
      {
        allergy_id: "2",
        name: "NSAIDS",
        date: "2007-04-25",
        symptoms: ["rashes", "diffculty in breathing"],
      },
    ],

    medical_conditions: [
      {
        condition_id: "3",
        condition: "Diabetes",
        date_of_diagnosis: "2007-04-25",
      },
      {
        condition_id: "100",
        condition: "Backpain",
        date_of_diagnosis: "2003-04-25",
      },
    ],

    records: [
      {
        record_id: "4",
        date: "2022-04-25",
        time: "15:40:50",
        description:
          "Pain over my right wrist, caught a pretty hard pass from my friend, the angle of my catch might be off",
        pain_score: 2,
        trigger: "after playing basketball",
      },
      {
        record_id: "5",
        date: "2022-04-27",
        time: "15:40:50",
        description: "Right wrist throbbing intermittently",
        pain_score: 3,
        trigger: "While using computer",
      },
      {
        record_id: "6",
        date: "2022-04-30",
        time: "15:40:50",
        description:
          "sudden sharp pain on my right wrist, woke me up from sleep",
        pain_score: 6,
        trigger: "While sleeping",
      },
      {
        record_id: "7",
        date: "2022-05-01",
        time: "15:40:50",
        description:
          "consistent dull aching pain on right wrist, sharp pain when pressure applied.",
        pain_score: 6,
        trigger: "no trigger, occurs consistently",
      },
    ],
  },
];

module.exports = seedUsers;
