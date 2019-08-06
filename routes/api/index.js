const router = require("express").Router();
const userRoutes = require("./userRoutes");
const raburlRoutes = require("./raburl");

router.use("/user", userRoutes);
router.use("/raburl", raburlRoutes);

module.exports = router;