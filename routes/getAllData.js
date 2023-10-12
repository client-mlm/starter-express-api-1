const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

module.exports = router;
