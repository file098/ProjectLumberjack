const db = require("../models");
const User = db.user;
const Session = db.session;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.addHandy = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(500).send("Body empty");
  } else {
    console.log(req.body.session);

    const session = new Session({
      creationDate: req.body.creationDate,
      review: req.body.review,
      source: req.body.source,
      grade: req.body.grade,
    });

    User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { sessions: session } },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: err });
        } else {
          console.log(user.sessions);
          return res.status(200).send("Added handy");
        }
      }
    );
  }
};
