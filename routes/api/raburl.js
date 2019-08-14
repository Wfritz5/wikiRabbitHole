const router = require("express").Router();
const raburlController = require("../../controllers/raburlController");

//router.route("/")
  //  .get(userController.findAll)
    

router.route("/:userId")
    .post(raburlController.create);
router.route("/:id")
    .get(raburlController.findById)  
    .put(raburlController.update)
    .delete(raburlController.remove);
router.route("/keyWord/:word")
    .get(reburlController.findByKeyWord);

module.exports = router;