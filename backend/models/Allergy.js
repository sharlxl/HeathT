const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllergySchema = new Schema({
  allergy_id: { type: String, required: true, unique: true },
  name: { type: String, required: [true, "Name is required."] },
  date: { type: Date },
  symptoms: [{ type: String, required: [true, "Symptom is required."] }],
});

const Allergy = mongoose.model("Allergy", AllergySchema);

module.exports = Allergy;
