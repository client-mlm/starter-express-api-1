const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, documentType, identityProofNumber,address,phone,name } = req.body;

    if (!email || !documentType || !identityProofNumber || !address) {
      return res
        .status(400)
        .json({
          message: "Document Type, Identity Proof Number and Address are required.",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.documentType = documentType;
    user.identityProofNumber = identityProofNumber;
    user.address=address;
    user.phone= phone;
    user.name=name;
    await user.save();

    return res.status(200).json({ message: "Profile Updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
