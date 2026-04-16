/**
 * Mongoose dropped callback support:
 * https://mongoosejs.com/docs/migrating_to_7.html#dropped-callback-support
 */
var express = require("express");
var User = require("./models/user");
var router = express.Router();

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

module.exports = router;
