const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load User model
const holdingsController = require("../../controllers/holdingsController");
const keys = require("../../config/keys");

router.get('/price', passport.authenticate('jwt', {
	session: false
}), holdingsController.findByUserID);

router.put('/price', passport.authenticate('jwt', {
	session: false
}), holdingsController.updateOrCreate)


module.exports = router;