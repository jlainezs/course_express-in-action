var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
require('dotenv').config()
var session = require("express-session");
var routes = require("./routes");

var app = express();
var connString = `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
console.log("Connecting to MongoDB with connection string: " + connString);

mongoose.connect(connString, {
    authSource: process.env.MONGO_USER,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
});

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(routes);
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
