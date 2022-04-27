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
      { $push: { medical_conditions: req.body.condition } },
      { runValidators: true }
    );
    // pushes the created allergy into the allergies array in the user info.
    res.json({ status: "ok", message: "condition created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong with creating condition",
      debugInfo: errorFormatter(error.errors.medical_conditions.message),
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deleteConditionFromUser = await User.updateOne(
      { user_id: req.body.user_id },
      { $pull: { medical_conditions: { condition_id: req.body.condition_id } } }
    );
    if (deleteConditionFromUser.modifiedCount === 1) {
      res.json({ status: "ok", message: "medical condition deleted" });
    } else {
      res.json({
        message: "something went wrong with deleting medical condition",
        debugInfo: "unable to delete medical condition",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.medical_conditions.message),
    });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const updateCondition = await User.updateOne(
      {
        user_id: req.body.user_id,
        "medical_conditions.condition_id": req.body.condition_id,
      },
      {
        $set: {
          "medical_conditions.$.condition": req.body.condition,
          "medical_conditions.$.date": req.body.date,
        },
      }
    );
    if (updateCondition.modifiedCount === 1) {
      res.json({ status: "ok", message: "medical condition edited" });
    } else {
      res.json({
        message: "something went wrong with editing medical condition",
        debugInfo: "unable to edit medical condition",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.medical_conditions.message),
    });
  }
});

module.exports = router;
