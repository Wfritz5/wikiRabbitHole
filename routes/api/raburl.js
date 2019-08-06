const router = require("express").Router();
const raburlController = require("../../controllers/raburlController");

router.route("/")
  //  .get(userController.findAll)
    .post(raburlController.create);

router.route("/:id")
    .get(raburlController.findById)  
    .put(raburlController.update)
    .delete(raburlController.remove);

module.exports = router;