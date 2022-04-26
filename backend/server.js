const express = require("express");
const connectDB = require("./db/db");
const users = require("./router/users");

const router = express();

require("dotenv").config();

router.get("/", (req, res) => {
  res.send(`router working running on port ${process.env.PORT}`);
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

connectDB(process.env.MONGODB_URI);

// // seed data //
// const seed = require("./models/seed.js");
// const Users = require("./models/Users");
// // const User = require('./models/users.js');

// app.get("/seedData", async (req, res) => {
//   await Users.deleteMany({});
//   // encrypts the given seed passwords
//   await seed.forEach((user) => {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   });
//   // seeds the data
//   await Users.create(seed, (err, createdUsers) => {
//     // logs created users
//     console.log(createdUsers);
//     // redirects to index
//     res.redirect("/");
//   });
// });

router.use("/users", users);

const PORT = process.env.PORT || 5001;
router.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
