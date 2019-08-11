const router = require("express").Router();
const raburlController = require("../../controllers/raburlController");

//router.route("/")
  //  .get(userController.findAll)
    

router.route("rabbitUrl/:userId")
    .post(raburlController.create);
router.route("rabbitUrl/:id")
    .get(raburlController.findById)  
    .put(raburlController.update)
    .delete(raburlController.remove);

module.exports = router;