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
      { $push: { records: req.body.record } },
      { runValidators: true }
    );
    // pushes the created allergy into the allergies array in the user info.
    res.json({ status: "ok", message: "record created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong with creating record",
      debugInfo: errorFormatter(error.errors.records.message),
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deleteRecordFromUser = await User.updateOne(
      { user_id: req.body.user_id },
      { $pull: { records: { record_id: req.body.record_id } } }
    );
    if (deleteRecordFromUser.modifiedCount === 1) {
      res.json({ status: "ok", message: "record deleted" });
    } else {
      res.json({
        message: "something went wrong with deleting record",
        debugInfo: "unable to delete record",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.records.message),
    });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const updateRecord = await User.updateOne(
      {
        user_id: req.body.user_id,
        "records.record_id": req.body.record_id,
      },
      {
        $set: {
          "records.$.description": req.body.description,
          "records.$.pain_score": req.body.pain_score,
          "records.$.trigger": req.body.trigger,
        },
      }
    );
    if (updateRecord.modifiedCount === 1) {
      res.json({ status: "ok", message: "record edited" });
    } else {
      res.json({
        message: "something went wrong with editing record",
        debugInfo: "unable to edit record",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.errors.records.message),
    });
  }
});

module.exports = router;
