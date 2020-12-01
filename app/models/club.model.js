const mongoose = require("mongoose");

const LocSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: { type: [Number], index: "2dsphere" },
});

const ClubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
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
  geometry: LocSchema,
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

exports.nearby = () => {};

exports.Club = Club;
