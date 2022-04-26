const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  user_id: { type: String, req: true, unique: true },
  name: { type: String, req: true, unique: true },
  password: { type: String, req: true },

  allergies: [
    {
      allergy_id: { type: String, req: true, unique: true },
      name: { type: String },
      date: { type: Date },
      symptoms: [{ type: String }],
    },
  ],

  medical_history: [
    {
      conditions_id: { type: String, req: true, unique: true },
      condition: { type: String },
      date_of_diagnosis: { type: Date },
    },
  ],

  records: [
    {
      record_id: { type: String, req: true, unique: true },
      date: { type: Date },
      description: { type: String },
      pain_score: { type: String }, // type Painscore = 'no pain' | 'mild' | 'mod' | 'severe' pain_score: { type: PainScore}
      trigger: { type: String },
    },
  ],
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
