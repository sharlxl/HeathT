const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const auth = require("../middleware/auth");

dotenv.config();

const errorFormatter = (e) => {
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
//auth middleware need a req.headers
//and user_id: req.boday for the user details
//should i add auth to the rest of the routes? eg allergies...auth,
router.get("/profile", async (req, res) => {
  const user = await User.find({ user_id: req.body });
  res.json(user);
});

router.post("/create", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create(req.body);
    // if (newUser) {
    //   const token = jwt.sign(
    //     { user_id: newUser.user_id, name: newUser.name },
    //     process.env.TOKEN_SECRET,
    //     { expiresIn: "1h" }
    //   ); // generates a JWT token on creation token: token
    res.json({ status: "ok", message: "user created" });
    // }
  } catch (error) {
    console.log(error);
    // res.status(401).json({
    //   message: "something went wrong with creating user",
    //   debugInfo: errorFormatter(error.message),
    // });
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

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name: req.body.name });

    //login fail check #1
    if (!user) {
      console.log("user null");
      return res.status(401).json({
        message: "user does not exist",
      });
    }

    //login fail check #2
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(401).json({
        message: "password does not match",
      });
    }

    // //creates a JWT token after passing both checks
    // const token = jwt.sign(
    //   { user_id: user.user_id, name: user.name },
    //   process.env.TOKEN_SECRET,
    //   { expiresIn: "1h" }
    // );, jwt: token && token

    if (user && passwordCheck) {
      res.json({ message: "log in sucessful", user: user });
    }
  } catch (error) {
    res.status(401).json({
      message: "something went wrong while logging in",
      debugInfo: errorFormatter(error.message),
    });
  }
});

// router.get("/logout", (req, res) => {
//   console.log(req.session);
//   req.session.destroy(() => {
//     res.json({ status: "ok", message: "logged out" });
//   });
//   console.log(req.session);
// });

// seed data //
const seed = require("../models/seed.js");

router.get("/seedData", async (req, res) => {
  await User.deleteMany({});
  // encrypts the given seed passwords
  await seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  await User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect("/");
  });
});

module.exports = router;
