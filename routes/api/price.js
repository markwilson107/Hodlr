const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load User model
const priceController = require("../../controllers/priceController");
const keys = require("../../config/keys");

// router.get('/price/:currency', passport.authenticate('jwt', {
// 	session: false
// }), priceController.getPriceByCurrency);

// router.put('/price', passport.authenticate('jwt', {
// 	session: false
// }), priceController.updateOrCreate)


module.exports = router;