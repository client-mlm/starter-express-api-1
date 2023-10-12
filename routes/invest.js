const express = require("express");
const { User } = require("../models/user");
const getCommissionPercentage = require("../utils/commissionPercentage");
const roundToTwo = require("../utils/roundTwoNumbers");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res
      .status(400)
      .json({ message: "User ID and amount are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Add investment amount to the user's current investment
    user.investment += Number(amount);
    await user.save();

    // Distribute the commission
    let currentLevel = 0;
    let currentUserId = user.referredBy;

    // let totalCommissionToDistribute = (await getCommissionPercentage(currentLevel) / 100) * amount;
    let totalDistributed = 0;

    while (currentUserId && currentLevel <= 15) {
      const currentUser = await User.findById(currentUserId);

      if (!currentUser) {
        break;
      }

      // Calculate commission based on the level
      let commissionPercentage = await getCommissionPercentage(currentLevel);
      let commissionAmount = (commissionPercentage / 100) * amount;
      commissionAmount = await roundToTwo(commissionAmount);

      totalDistributed += commissionAmount;

      // Add commission to the current user's total commission
      currentUser.commission += Number(commissionAmount);
      await currentUser.save();

      currentUserId = currentUser.referredBy;
      currentLevel += 1;
    }
    let level0User = await User.findOne({ level: 0 }); // Assuming the person investing is at level 0
    level0User.commission += amount - totalDistributed;
    await level0User.save();

    res.status(200).json({ message: "Investment processed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
