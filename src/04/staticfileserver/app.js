var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(morgan("short"));

app.use(function (req, res, next) {
    // console.log("Request IP: " + req.ip);
    // console.log("Request date: " + new Date());
    next();
});

app.use(function(req, res, next) {
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            next();
            return;
        }
            
        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});

app.use(function (req, res) {
    res.status(404);
    res.send("File not found");
});

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
