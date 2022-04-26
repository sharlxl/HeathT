const express = require("express");
const Allergy = require("../models/Allergy");
const Users = require("../models/User");
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
    const allergy = await Allergy.create(req.body.allergy);
    await Users.updateOne(
      { user_id: req.body.user_id },
      { $push: { allergies: allergy } }
    );
    res.json({ status: "ok", message: "allergy created" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "something went wrong",
      debugInfo: errorFormatter(error.message),
    });
  }
});

// router.delete("/delete", async (req, res) => {
//   try {
//     const { user_id } = req.body;
//     const deleteUser = await User.deleteOne({ user_id });
//     console.log(deleteUser);
//     if (deleteUser.deletedCount === 1) {
//       res.json({ status: "ok", message: "user deleted" });
//     } else {
//       res.json({
//         message: "unable to delete user",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       message: "something went wrong",
//     });
//   }
// });

module.exports = router;
