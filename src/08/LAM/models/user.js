var mongoose = require("mongoose");

var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var noop = function () { };

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    displayName: String,
    bio: String,
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
}

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.pre("save", function() {
    var user = this;
    if (!user.isModified("password")) {
        return;
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return err; }
        bcrypt.hash(user.password, salt, noop,
            function(err, hashedPassword) {
                if (err) { return err; }
                user.password = hashedPassword;
            });
    });
});

var User = mongoose.model("User", userSchema);
module.exports = User;
