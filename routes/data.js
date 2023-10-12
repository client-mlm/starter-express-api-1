const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/:referralCode", async (req, res) => {
  try {
    const user = await User.findOne({ referralCode: req.params.referralCode });
    if (!user) return res.status(404).json({ message: "User not found" });

    let accessibleData = [];
    accessibleData.push(user);

    // Fetch directly referred users' data
    const directReferrals = await User.find({ referredBy: user._id });
    accessibleData = [...accessibleData, ...directReferrals];

    // If the user is at level 0, fetch all data
    if (user.level === 0) {
      const allUsers = await User.find({});
      accessibleData = [...allUsers];
    }

    res.json(accessibleData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
