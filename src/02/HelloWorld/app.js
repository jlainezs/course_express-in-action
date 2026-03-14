var express = require('express');
var http = require('http');

var app = express();
app.use(function(req, res) {
    console.log("In comes a request to: " + req.url);
});

http.createServer(app).listen(3000);