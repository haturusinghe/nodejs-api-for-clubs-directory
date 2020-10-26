const express = require("express");
const router = express.Router();
const clubs = require("../controllers/club.controller.js");

router.get("/new", clubs.create);

module.exports = router;
