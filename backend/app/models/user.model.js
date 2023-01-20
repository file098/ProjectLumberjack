const mongoose = require("mongoose");
const Session = require("./session.model");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    sessions: [
      {
        creationDate: Date,
        review: String,
        source: String,
        grade: Number,
      },
    ],
  })
);

module.exports = User;
