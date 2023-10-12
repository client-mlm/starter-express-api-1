const express = require("express");
const Image = require("../models/image");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await Image.find();

    // Check if there are no images
    if (!images || images.length === 0) {
      return res.status(404).send("No images found");
    }

    // Convert binary image data to base64 for each image
    const imagesData = images.map((image) => ({
      _id: image._id,
      contentType: image.img.contentType,
      data: image.img.data.toString("base64"),
    }));

    res.json(imagesData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
