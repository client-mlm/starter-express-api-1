const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, address } = req.body;

    if (!email || !address) {
      return res.status(400).json({ message: "Address is required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.address = address;
    await user.save();

    return res.status(200).json({ message: "Profile Updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
