const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/url");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/", async (req, res) => {
  const longUrl = req.body.url;

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ original_url: longUrl }).select(
        "-_id -__v"
      );

      if (url) {
        res.json(url);
      } else {
        const shortUrl = shortid.generate();

        url = new Url({
          original_url: longUrl,
          short_url: shortUrl,
        });

        await url.save();

        res.json({ original_url: url.original_url, short_url: url.short_url });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json({ error: "invalid url" });
  }
});

module.exports = router;
