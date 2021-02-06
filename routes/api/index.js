const router = require("express").Router();
const userRoutes = require("./users");
const holdingsRoutes = require("./holdings");
const priceRoutes = require("./price");
const exchangeRoutes = require("./exchanges");

// User routes
router.use("/users", userRoutes);

// Holdings routes
router.use("/users", holdingsRoutes);

// Price routes
router.use("/price", priceRoutes);

// Exchange routes
router.use("/exchange", exchangeRoutes);

module.exports = router;
