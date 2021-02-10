const router = require("express").Router();
const userRoutes = require("./users");
const holdingsRoutes = require("./holdings");
const priceRoutes = require("./price");
const exchangeRoutes = require("./exchanges");
const favoritesRoutes = require("./favorites");

// User routes
router.use("/users", userRoutes);

// Holdings routes
router.use("/users", holdingsRoutes);

// Price routes
router.use("/price", priceRoutes);

// Exchange routes
router.use("/exchange", exchangeRoutes);

// Favorites routes
router.use("/users", favoritesRoutes);

module.exports = router;
