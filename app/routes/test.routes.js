const express = require("express");
const router = express.Router();
const clubs = require("../controllers/club.controller.js");

router.post("/new", clubs.create);

// Update a Note with clubId
router.put("/:clubId", clubs.update);

// Delete a Note with clubId
router.delete("/:clubId", clubs.delete);

module.exports = router;
