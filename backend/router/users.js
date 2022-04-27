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

/** users */
router.get("/profile", async (req, res) => {
  const userProfile = await User.find({});
  res.json(userProfile);
});

router.post("/create", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong with creating user",
      debugInfo: errorFormatter(error.message),
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { user_id } = req.body;
    const deleteUser = await User.deleteOne({ user_id });
    console.log(deleteUser);
    if (deleteUser.deletedCount === 1) {
      res.json({ status: "ok", message: "user deleted" });
    } else {
      res.json({
        message: "unable to delete user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong with deleting",
    });
  }
});

/** allergies */

router.post("/allergies/new", async (req, res) => {
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

router.delete("/allergies/delete", async (req, res) => {
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

router.put("/allergies/edit", async (req, res) => {
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

/** condition */
router.post("/conditions/new", async (req, res) => {
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

router.delete("/conditions/delete", async (req, res) => {
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

module.exports = router;
