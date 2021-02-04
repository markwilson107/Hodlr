const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../../validation/register");
// Load User model
const db = require("../../models");
const keys = require("../../config/keys");

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
	var user = new db.User({
    name: req.body.name,
		email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
	})

	user.save().then((err) => {
		// Token
		const token = jwt.sign({id: user.id}, keys.secretOrKey, {expiresIn: "1y"})
		res.json({token: token})

	}).catch((err) => {
		res.status().json({})
	})
})


// Login
router.post('/login', passport.authenticate('local', {
	session: false
}), (req, res) => {
	// Token
	const token = jwt.sign({id: req.user.id}, keys.secretOrKey)

	res.json({token: token})
});

// Return user information
router.get('/user', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	if ( !req.user ) {
		
		res.json({
			username: 'nobody'
		})
	}

	res.json({
		user: req.user.name
	})
})

module.exports = router;
