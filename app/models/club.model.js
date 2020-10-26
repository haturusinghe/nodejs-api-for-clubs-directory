const mongoose = require("mongoose");

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
});

const Club = mongoose.model("Club", ClubSchema);

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Club.find()
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

module.exports = Club;
