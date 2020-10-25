const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema(
  {
    name: String,
    district: String,
    contactNum: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", ClubSchema);
