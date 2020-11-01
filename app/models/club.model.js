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
  clubPresident: {
    type: String,
  },
});

const Club = mongoose.model("Club", ClubSchema);

exports.list = (perPage, page, query) => {
  if (!query) {
    query = " ";
  }
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

exports.Club = Club;
