// routes/login.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const router = express.Router();


router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password." });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid email or password." });

        // Generate a JWT
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '24h'  // Token expires in 24 hours, adjust as necessary
        });

        res.status(200).json({ message: "Logged in successfully!", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
