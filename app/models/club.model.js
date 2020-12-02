const mongoose = require("mongoose");

const LocSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const ClubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mailingAddress: String,
  contactNum: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  website: {
    type: String,
    unique: true,
  },
  clubPresident: {
    type: String,
  },
  meetingDay: {
    type: String,
    required: true,
  },
  meetingTime: {
    type: String,
  },
  meetingAddress: {
    type: String,
    required: true,
  },
  meetingLanguage: {
    type: String,
    required: true,
  },
  location: {
    type: LocSchema,
    required: true,
    index: "2dsphere",
  },
});

const Club = mongoose.model("Club", ClubSchema);

exports.list = (perPage, page, query) => {
  console.log(`hello from ${query}`);
  return new Promise((resolve, reject) => {
    Club.find({ name: new RegExp(query, "i") })
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.nearby = (perPage, page, long, latt) => {
  console.log(`received coordinates ${long} ${latt}`);
  return new Promise((resolve, reject) => {
    Club.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [long, latt] },
          $maxDistance: 50000,
        },
      },
    })
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.within = (topLong, topLatt, botLong, botLatt) => {
  return new Promise((resolve, reject) => {
    Club.find({
      location: {
        $geoWithin: {
          $box: [
            [topLong, topLatt],
            [botLong, botLatt],
          ],
        },
      },
    }).exec(function (err, users) {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

exports.Club = Club;
