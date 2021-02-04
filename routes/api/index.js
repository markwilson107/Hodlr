const router = require("express").Router();
const userRoutes = require("./users");
const holdingsRoutes = require("./holdings");
const priceRoutes = require("./price");

// User routes
router.use("/users", userRoutes);

// Holdings routes
router.use("/users", holdingsRoutes);

// Price routes
router.use("/users", priceRoutes);

module.exports = router;
