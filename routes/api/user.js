const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll)
    .post(userController.create);

router.route("/api/users/login/:username")
    .get(userController.findByUsername);

router.route("/api/users/signup")
    .post(userController.create)

router.route("/api/scrape/:id")
    .get(userController.findById)


router.route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;