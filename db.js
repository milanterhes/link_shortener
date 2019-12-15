const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const urlEntrySchema = new Schema({
  shortForm: String,
  longForm: String
});

const UrlEntry = mongoose.model("UrlEntry", urlEntrySchema);

module.exports = {
  UrlEntry
};
