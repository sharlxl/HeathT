const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, req: true, unique: true },
  name: {
    type: String,
    req: [true, "Name is required."],
    unique: [true, "That name is taken."],
    lowercase: true,
    validate: [
      validator.isAlphanumeric,
      "Name may only have letters and numbers.",
    ],
  },
  password: {
    type: String,
    req: [true, "Password is required."],
    minLength: [8, "Password should be at least 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please retype your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `Passwords don't match.`,
    },
  },
  allergies: { type: Array },
  medical_history: { type: Array },
  records: { type: Array },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
