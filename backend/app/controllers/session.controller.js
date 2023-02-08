const db = require("../models");
const mongoose = require("mongoose");
const User = db.user;
const Session = db.session;

exports.addHandy = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(500).send("Body empty");
  } else {
    let requestSession = req.body.session;
    const insertSession = new Session({
      _userid: requestSession.userid,
      creationDate: requestSession.creationDate,
      review: requestSession.review,
      source: requestSession.source,
      grade: requestSession.grade,
    });

    const options = {
      upsert: false,
      "Content-Type": "application/json",
    };
    Session.insertMany(insertSession, options, (err, result) => {
      if (err) {
        return res.status(501).send(err);
      } else {
        res.status(200).send({ result });
      }
    });
  }
};

exports.totalHandy = (req, res) => {
  Session.countDocuments().then((count, err) => {
    if (count) {
      return res.status(200).send({ total: count });
    } else {
      return res.status(500).send(err);
    }
  });
};

exports.userHandy = (req, res) => {
  const userid = req.query.userid;
  Session.aggregate(
    [
      {
        $group: {
          _id: "$_userid",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userid),
        },
      },
    ],
    function (err, result) {
      if (err) console.log(err);
      if (result && result.length > 0) {
        return res.status(200).send(result[0]);
      } else {
        return res.status(500).send({ error: err });
      }
    }
  );
};

exports.scoreboard = (req, res) => {
  Session.aggregate(
    [
      {
        $group: {
          _id: "$_userid",
          total: {
            $sum: 1,
          },
        },
      },
    ],
    (error, result) => {
      if (error) console.log(error);
      if (result.length > 0) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send({ error: error });
      }
    }
  );
};
