const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load User model
const holdingsController = require("../../controllers/holdingsController");
const keys = require("../../config/keys");

router.get('/holdings', passport.authenticate('jwt', {
	session: false
}), holdingsController.findByUserID);

router.put('/holdings', passport.authenticate('jwt', {
	session: false
}), holdingsController.updateOrCreate)

router.delete('/holdings/:date', passport.authenticate('jwt', {
	session: false
}), holdingsController.remove)

module.exports = router;