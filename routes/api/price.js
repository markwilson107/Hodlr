const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
// Load User model
const priceController = require("../../controllers/priceController");
const keys = require("../../config/keys");

router.get('/:exchange/:pair', priceController.getPrice);

router.get('/all', priceController.getAll);

// router.put('/price', passport.authenticate('jwt', {
// 	session: false
// }), priceController.updateOrCreate)


module.exports = router;