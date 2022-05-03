const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const users = require("./router/users");
const records = require("./router/records");
const conditions = require("./router/conditions");
const allergies = require("./router/allergies");

const router = express();

require("dotenv").config();

router.get("/", (req, res) => {
  res.send(`router working running on port ${process.env.PORT}`);
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

connectDB(process.env.MONGODB_URI);

router.use(cors());

router.use("/users", users);
router.use("/allergies", allergies);
router.use("/conditions", conditions);
router.use("/records", records);

const PORT = process.env.PORT || 5001;
router.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
