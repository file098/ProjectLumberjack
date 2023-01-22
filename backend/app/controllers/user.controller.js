const { session } = require("../models");
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
    // console.log(req.body.session);

    let x = req.body.session;
    const session = {
      creationDate: x.creationDate,
      review: x.review,
      source: x.source,
      grade: x.grade,
    };

    console.log(session);

    User.updateOne(
      { username: req.body.username },
      {
        $push: {
          sessions: session,
        },
      },
      {
        upsert: false,
        "Content-Type": "application/json",
      },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.status(501).send({ message: err });
        } else {
          return res.status(200).send("Added handy");
        }
      }
    );
  }

  // console.log(
  //   req.body.username,
  //   req.body.review,
  //   req.body.source,
  //   req.body.grade
  // );

  // User.findOneAndUpdate(
  //   { username: "user" },
  //   {
  //     $push: {
  //       sessions: {
  //         creationDate: 1,
  //         review: "review",
  //         source: "source",
  //         grade: 2,
  //       },
  //     },
  //   },
  //   {
  //     upsert: false,
  //     "Content-Type": "application/json",
  //   }
  // );
};
