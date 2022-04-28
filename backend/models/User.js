const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: [true, "That name is taken."],
    lowercase: true,
    validate: [
      validator.isAlphanumeric,
      "Name may only have letters and numbers.",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "Password should be at least 8 characters"],
  },
  // confirmPassword: {
  //   type: String,
  //   required: [true, "Please retype your password."],
  //   validate: {
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: `Passwords don't match.`,
  //   },
  // },
  allergies: [
    {
      allergy_id: { type: String, required: true, unique: true },
      name: { type: String, required: [true, "Name is required."] },
      date: { type: Date },
      symptoms: [{ type: String, required: [true, "Symptom is required."] }],
    },
  ],
  medical_conditions: [
    {
      condition_id: { type: String, required: true, unique: true },
      condition: { type: String, required: [true, "Condition is required."] },
      date_of_diagnosis: { type: Date },
    },
  ],
  records: [
    {
      record_id: { type: String, required: true, unique: true },
      date: { type: Date },
      time: { type: Date },
      description: {
        type: String,
        required: [true, "description is required."],
      },
      pain_score: { type: String },
      trigger: { type: String },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
