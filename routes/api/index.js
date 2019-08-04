const router = require("express").Router();
const userRoutes = require("./user");
const raburlRoutes = require("./raburl");

router.use("/user", userRoutes);
router.use("/raburl", raburlRoutes);

module.exports = router;