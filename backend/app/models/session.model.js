const mongoose = require("mongoose");

const Session = mongoose.model(
  "Session",
  new mongoose.Schema({
    _userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creationDate: Date,
    review: String,
    source: String,
    grade: Number,
  })
);

module.exports = Session;
