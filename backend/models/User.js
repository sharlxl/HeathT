const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const AllergySchema = new Schema({
  allergy_id: { type: String, required: true, unique: true },
  name: { type: String, required: [true, "Name is required."] },
  date: { type: String },
  symptoms: [{ type: String, required: [true, "Symptom is required."] }],
});

const ConditionSchema = new Schema({
  condition_id: { type: String, required: true, unique: true },
  condition: { type: String, required: [true, "Condition is required."] },
  date_of_diagnosis: { type: String },
});

const RecordSchema = new Schema({
  record_id: { type: String, required: true, unique: true },
  date: { type: String },
  time: { type: String },
  description: {
    type: String,
    required: [true, "description is required."],
  },
  pain_score: { type: Number },
  trigger: { type: String },
});

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
  allergies: {
    type: [AllergySchema],
    required: false,
  },

  medical_conditions: {
    type: [ConditionSchema],
    required: false,
  },

  records: {
    type: [RecordSchema],
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
