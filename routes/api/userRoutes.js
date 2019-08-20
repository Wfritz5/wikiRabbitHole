const router = require("express").Router();
const passport = require('../../config/passport');
const db = require('../../models');
const authMiddleware = require('../../config/middleware/authMiddleware');
const userController = require("../../controllers/userController");

// router.route("/")
//     .get(userController.findAll)
//     .post(userController.create);

 router.route("/username/:username")
     .get(userController.findByUserName);

// router.route("/api/users/signup")
//     .post(userController.create)

// router.route("/api/scrape/:id")
//     .get(userController.findById)


router.route("/:id") 
     .put(userController.update)
     .delete(userController.remove);
router.route("/byid/:id")
     .get(userController.findById)

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/api/users/unauthorized",
    falureFlash: true
}), function (req, res, next) {
    console.log('sign in successful')
    res.json({
        user: req.user,
        loggedIn: true
    });
});

router.post("/signup", function (req, res, next) {
    db.User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (user) {
            console.log("user already exists")
            return res.json("user already exists");
        }
        if (!user) {
            let newUser = new db.User({
                username: req.body.username,
                password: req.body.password
            })
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function (err) {
                if (err) throw err;
                console.log("user saved!");
                res.redirect(307, "/api/users/login")
            });
        }
    })
});

router.get("/unauthorized", function (req, res, next) {

    let message = req.flash("error")[0]

    setTimeout(function () {
        res.json({
            message: message,
            loggedIn: false
        });
    }, 100);
});
router.get("/profile", authMiddleware.isLoggedIn, function (req, res, next) {
    res.json({
        user: req.user,
        loggedIn: true
    });
});


router.get("/logout", authMiddleware.logoutUser, function (req, res, next) {
    res.json("User logged out successfully");
});

router.get("/user", authMiddleware.isLoggedIn, function (req, res, next) {
    db.User.findByIdAndUpdate(req.user._id).populate('raburl').then((user) => {
        res.json(user);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;