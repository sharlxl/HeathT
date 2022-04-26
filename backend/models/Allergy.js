const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllergySchema = new Schema({
  allergy_id: { type: String, req: true, unique: true },
  name: { type: String, req: [true, "Name is required."] },
  date: { type: Date },
  symptoms: [{ type: String, req: [true, "Symptom is required."] }],
});

const Allergy = mongoose.model("Allergy", AllergySchema);

module.exports = Allergy;
