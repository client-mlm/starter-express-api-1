const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.js');
const generateUniqueReferralCode = require('../utils/uniqueCodeGenerator');

const router = express.Router();

router.post('/', async (req, res) => {
    const {name,email, phone, password, referredByCode } = req.body;
    if (!name || !email || !phone || !password || !referredByCode) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const referredByUser = await User.findOne({ referralCode: referredByCode });
        if (!referredByUser) return res.status(400).json({ message: "Referral code invalid" });
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const referralCode = await generateUniqueReferralCode();
        const level = referredByUser.level + 1;
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            referralCode,
            referredBy: referredByUser._id,
            level
        });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully!", referralCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
