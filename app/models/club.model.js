const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    contactNum: String,
    email: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", ClubSchema);
