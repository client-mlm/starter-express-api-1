const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, withdrawalAmount } = req.body;

    if (!email || !withdrawalAmount) {
      return res
        .status(400)
        .json({ message: "userId and withdrawalAmount are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (withdrawalAmount > user.commission) {
      return res.status(400).json({
        message: "You cannot withdraw more than your invested amount.",
      });
    }

    user.commission -= withdrawalAmount;

    await user.save();

    return res.status(200).json({ message: "Withdrawal successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
