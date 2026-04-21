/**
 * Mongoose dropped callback support:
 * https://mongoosejs.com/docs/migrating_to_7.html#dropped-callback-support
 */
var express = require("express");
var passport = require("passport");
var User = require("./models/user");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function (req, res, next) {
    User.find()
        .sort({ createdAt: "descending" })
        .then(function (users) {
            res.render("index", { users: users });
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.post("/signup", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username })
        .then(function (user) {
            if (user) {
                req.flash("error", "User already exists");
                return res.redirect("/signup");
            }
        })
        .catch((err) => {
            return next(err);
        });
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save();
        next();
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
    User.findOne({ username: req.params.username })
        .then(function(user) {
            if (!user) { return next(404); }
            res.render("profile", { user: user });
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/edit", ensureAuthenticated, function(req, res) {
    res.render("edit");
});

// browser HTML forms doesn't support PUT, so we must use POST
router.post("/edit", ensureAuthenticated, function(req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});

module.exports = router;
