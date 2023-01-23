const db = require("../models");
const User = db.user;

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

exports.totalHandy = (req, res) => {
  User.aggregate(
    [
      {
        $project: {
          _id: null,
          tot: {
            $size: "$sessions",
          },
        },
      },
      {
        $group: {
          _id: "tot",
          total: {
            $sum: "$tot",
          },
        },
      },
    ],
    function (err, result) {
      if (err) console.log(err);
      if (result.length > 0) {
        return res.status(200).send(result[0]);
      } else {
        return res.status(500).send({ error: err });
      }
    }
  );
};

exports.addHandy = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(500).send("Body empty");
  } else {
    let requestSession = req.body.session;

    const query = { username: req.body.username };
    const update = {
      $push: {
        sessions: {
          creationDate: requestSession.creationDate,
          review: requestSession.review,
          source: requestSession.source,
          grade: requestSession.grade,
        },
      },
    };
    const options = {
      upsert: false,
      "Content-Type": "application/json",
    };

    User.updateOne(query, update, options, (err) => {
      if (err) {
        return res.status(501).send(err);
      } else {
        res.status(200).send({ body: "Added handy" });
      }
    });
  }
};
