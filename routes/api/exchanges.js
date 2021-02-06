const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load User model
const exchangesController = require("../../controllers/exchangesController");

router.get('/exchanges', exchangesController.findAll);

router.get('/exchanges/:id', exchangesController.findPairs)


module.exports = router;