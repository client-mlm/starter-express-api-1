const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Image = require("../models/image");

dotenv.config();

const router = express.Router();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setup Multer
const storage = multer.memoryStorage(); // Storing files in memory
const upload = multer({ storage: storage });

// Define the upload route
router.post("/", upload.array("images"), async (req, res) => {
  try {
    // Loop through uploaded files and save them to MongoDB
    for (const file of req.files) {
      let image = new Image();
      image.img.data = file.buffer;
      image.img.contentType = file.mimetype;
      await image.save();
    }
    res.status(200).send("Images uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
