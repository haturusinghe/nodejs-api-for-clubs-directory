const express = require("express");
const router = express.Router();
const clubs = require("../controllers/club.controller.js");

router.get("/", clubs.create);

module.exports = router;
