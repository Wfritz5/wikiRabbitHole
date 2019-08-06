const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy();
const db = require('../models');

passport.use(new LocalStrategy(function (username, password, done) {
    db.User.findOne({
        username: username
    }, function (err, user) {
        return err ? (console.log("something went wrong\n", err), done(err)) :
            user ? user.validPassword(password, user.password) ? done(null, user) :
            done(null, false, {
                message: "invalid password"
            }) : done(null, false, {
                message: "User not found"
            })
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;