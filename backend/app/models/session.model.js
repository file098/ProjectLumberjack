const mongoose = require("mongoose");

const Session = mongoose.model(
  "Session",
  new mongoose.Schema({
    creationDate: Date,
    review: String,
    source: String,
    grade: Number,
  })
);

module.exports = Session;
