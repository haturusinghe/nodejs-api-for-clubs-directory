const Club = require("../models/club.model.js");

// Create and Save a new Club
exports.create = (req, res) => {
  console.log("Attempting to create a new club entry");
  console.log(req.body.content);
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({ message: "empty request" });
  }

  // Create a Club
  const club = new Club({
    title: req.body.title || "Untitled Club",
    content: req.body.content,
    contactNum: req.body.contactNum,
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
  Club.find()
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

// Find a single club with a clubId
exports.findOne = (req, res) => {
  Club.findById(req.params.clubId)
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
  Club.findByIdAndUpdate(
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
  Club.findByIdAndRemove(req.params.clubId)
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
