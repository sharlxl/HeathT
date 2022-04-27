const express = require("express");
const User = require("../models/User");
const router = express.Router();

const errorFormatter = (e) => {
  // "User validation failed: name: Name may only have letters and numbers., password: Password should be at least 8 characters, confirmPassword: Please retype your password."
  const errors = {};
  const allErrors = e.substring(e.indexOf(":") + 1).trim();
  const splitAllErrors = allErrors.split(",").map((err) => err.trim());
  splitAllErrors.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  return errors;
};

router.post("/new", async (req, res) => {
  try {
    await User.updateOne(
      { user_id: req.body.user_id },
      { $push: { allergies: req.body.allergy } },
      { runValidators: true }
    );
    // pushes the created allergy into the allergies array in the user info.
    res.json({ status: "ok", message: "allergy created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong with creating allergy",
      debugInfo: errorFormatter(error.errors.allergies.message),
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deleteAllergyFromUser = await User.updateOne(
      { user_id: req.body.user_id },
      { $pull: { allergies: { allergy_id: req.body.allergy_id } } }
    );
    if (deleteAllergyFromUser.modifiedCount === 1) {
      res.json({ status: "ok", message: "allergy deleted" });
    } else {
      res.json({
        message: "something went wrong with deleting allergy",
        debugInfo: "unable to delete allergy",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.allergies.message),
    });
  }
});

router.put("/edit", async (req, res) => {
  try {
    // finds user by id (based on current logged in user )
    const updateAllergy = await User.updateOne(
      {
        user_id: req.body.user_id,
        "allergies.allergy_id": req.body.allergy_id,
      },
      {
        $set: {
          "allergies.$.name": req.body.name,
          "allergies.$.date": req.body.date,
          "allergies.$.symptoms": req.body.symptoms,
        },
      }
    );
    if (updateAllergy.modifiedCount === 1) {
      res.json({ status: "ok", message: "allergy edited" });
    } else {
      res.json({
        message: "something went wrong with editing allergy",
        debugInfo: "unable to edit allergy",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.allergies.message),
    });
  }
});

module.exports = router;
