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
		color: '#ffce49'
	})


	user.save().then((err) => {
		// Token
		const token = jwt.sign({ id: user.id }, keys.secretOrKey, { expiresIn: "1y" })
		res.json({ token: token })

		const holdings = new db.Holdings({
			userId: user.id,
			holdings: []
		})
		holdings.save().catch(err => res.status(422).json(err));
		const favorites = new db.Favorites({
			userId: user.id,
			favorites: []
		})
		favorites.save().catch(err => res.status(422).json(err));

	}).catch(err => res.status(422).json(err));
})


// Login
router.post('/login', passport.authenticate('local', {
	session: false
}), (req, res) => {
	console.log(req.user);
	// Token
	const token = jwt.sign({ id: req.user.id }, keys.secretOrKey)

	res.json({ token: token })
});

// Return user information
router.get('/user', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	if (!req.user) {

		res.json({
			username: 'nobody'
		})
	}

	res.json({
		user: req.user.name,
		email: req.user.email,
		color: req.user.color
	})
});

router.delete('/user', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	console.log(req.user.id)
	if (req.user.email === "demo@email.com") {
		res.json({
			ok: -1,
			message: `Demo account can't be removed.`
		});
	} else {
		db.User.deleteOne({ _id: req.user.id }, function (err) {
			if (err) {
				console.log(err);
				res.json({
					ok: -1,
					message: `${req.user.email} could not be removed.`
				});
			} else {
				db.Favorites.deleteOne({ userId: req.user.id }, function (err) {
					if (err) {
						console.log(err);
						res.json({
							ok: 0,
							message: `${req.user.email} could not be fully removed, please contact support.`
						});
					} else {
						db.Holdings.deleteOne({ userId: req.user.id }, function (err) {
							if (err) {
								console.log(err);
								res.json({
									ok: 0,
									message: `${req.user.email} could not be fully removed, please contact support.`
								});
							} else {
								res.json({
									ok: 1,
									message: `${req.user.email} has been removed.`
								});
							}
						});
					}
				});
			}
		});
	}
});

module.exports = router;