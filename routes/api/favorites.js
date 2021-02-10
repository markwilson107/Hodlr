const express = require("express");
const passport = require("passport");
const router = express.Router();

const favoritesController = require("../../controllers/favoritesController");

router.get('/favorites', passport.authenticate('jwt', {
	session: false
}), favoritesController.findByUserID);

router.put('/favorites', passport.authenticate('jwt', {
	session: false
}), favoritesController.updateOrCreate)

router.delete('/favorites', passport.authenticate('jwt', {
	session: false
}), favoritesController.remove)


module.exports = router;