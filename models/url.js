const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
});

module.exports = mongoose.model("Url", urlSchema);
