const express = require("express");
const router = express.Router();

const url = require("../models/url");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:shortURL", async (req, res) => {
  try {
    const url_found = await url.findOne({ short_url: req.params.shortURL });

    if (url_found) {
      return res.redirect(url_found.original_url);
    } else {
      return res.status(404).json({
        error: "No short URL found for the given input",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
