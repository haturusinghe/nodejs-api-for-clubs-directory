const ClubModel = require("../models/club.model.js");

// Create and Save a new Club
exports.create = (req, res) => {
  console.log("Attempting to create a new club entry");
  console.log(req.body);
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: "empty request" });
  }

  // Create a Club
  const club = new ClubModel.Club({
    name: req.body.name,
    mailingAddress: req.body.mailingAddress,
    contactNum: req.body.contactNum,
    email: req.body.email,
    website: req.body.website,
    clubPresident: req.body.clubPresident,
    location: req.body.location,
    meetingDay: req.body.meetingDay,
    meetingTime: req.body.meetingTime,
    meetingAddress: req.body.meetingAddress,
    meetingLanguage: req.body.meetingLanguage,
  });

  // Save Club in the database
  club
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating.",
      });
    });
};

// Retrieve and return all clubs from the database.
exports.findAll = (req, res) => {
  ClubModel.find()
    .then((clubs) => {
      console.log("Displaying all clubs");
      res.send(clubs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving",
      });
    });
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  let name = "";
  console.log(req.query);
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
    if (req.query.name) {
      name = req.query.name;
      console.log(name);
    }
  }
  ClubModel.list(limit, page, name).then((result) => {
    res.status(200).send(result);
  });
};

exports.filter = (req, res) => {
  const {
    name = "",
    meetingDay = 0,
    meetingLanguage = 0,
    long = null,
    latt = null,
  } = req.query;
  const searchObject = { $and: [] };
  const oldQuery = name;
  name = { $regex: name, $options: "i" };
  searchObject.$and.push({ name: name });

  if (long && latt) {
    const location = {
      location: {
        $near: {
          $maxDistance: 100000,
          $geometry: { type: "Point", coordinates: [long, latt] },
        },
      },
    };
    searchObject.$and.push(location);
  }

  meetingDay === 0 ? null : searchObject.$and.push({ meetingDay: meetingDay });
  meetinglanguage === 0
    ? null
    : searchObject.$and.push({ meetingLanguage: meetingLanguage });

  console.log(searchObject);
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  ClubModel.filter(limit, page, oldQuery).then((result) => {
    res.status(200).send(result);
  });
};

exports.nearby = (req, res) => {
  let long = 0;
  let latt = 0;
  if (req.query.long && req.query.long) {
    long = parseFloat(req.query.long);
    latt = parseFloat(req.query.latt);
    ClubModel.nearby(5, 1, long, latt).then((result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(404).send("Invalid Coordinates");
  }
};

exports.within = (req, res) => {
  let topLong, topLatt, botLong, botLatt;
  if (
    req.query.topLong &&
    req.query.topLatt &&
    req.query.botLong &&
    req.query.botLatt
  ) {
    topLong = parseFloat(req.query.topLong);
    topLatt = parseFloat(req.query.topLatt);
    botLong = parseFloat(req.query.botLong);
    botLatt = parseFloat(req.query.botLatt);
    ClubModel.within(topLong, topLatt, botLong, botLatt).then((result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(404).send("Invalid Coordinates");
  }
};

// Find a single club with a clubId
exports.findOne = (req, res) => {
  ClubModel.Club.findById(req.params.clubId)
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      res.send(club);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving club with id " + req.params.clubId,
      });
    });
};

// Update a club identified by the clubId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Club content can not be empty",
    });
  }

  // Find club and update it with the request body
  ClubModel.Club.findByIdAndUpdate(
    req.params.clubId,
    {
      title: req.body.title || "Untitled Club",
      content: req.body.content,
    },
    { new: true }
  )
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      res.send(club);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      return res.status(500).send({
        message: "Error updating club with id " + req.params.clubId,
      });
    });
};

// Delete a club with the specified clubId in the request
exports.delete = (req, res) => {
  ClubModel.Club.findByIdAndRemove(req.params.clubId)
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      res.send({ message: "Club deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Club not found with id " + req.params.clubId,
        });
      }
      return res.status(500).send({
        message: "Could not delete club with id " + req.params.clubId,
      });
    });
};
