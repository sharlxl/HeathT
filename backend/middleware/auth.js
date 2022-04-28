const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "authentication failed" });
  } else {
    jwt.verify(token, String(process.env.TOKEN_SECRET), function (err, decode) {
      if (err) {
        req.user = undefined;
        res.status(401).json({ message: "authentication failed" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};
