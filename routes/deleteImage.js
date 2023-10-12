const express = require("express");
const Image = require("../models/image");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).send("Image not found");
    }

    await Image.deleteOne({ _id: req.params.id });

    res.status(200).send("Image deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
