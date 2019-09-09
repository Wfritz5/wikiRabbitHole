const router = require("express").Router();
const userRoutes = require("./userRoutes");
const raburlRoutes = require("./raburl");
const scrapeRoutes = require("./scrape");

router.use("/users", userRoutes);
router.use("/raburl", raburlRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;