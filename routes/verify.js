const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "_id name email phone referralCode level data investment commission address documentType identityProofNumber"
    ); // Excluding the password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found.", status: 102 });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
