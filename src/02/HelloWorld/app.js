var express = require('express');
var http = require('http');

var app = express();

// middleware function to log the request path
app.use(function(req, res, next) {
    console.log("In comes a request to: " + req.url);
    next();
});

// middleware function to send the response
// it is the last middleware function in the stack, so it doesn't call next()
app.use(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
});

http.createServer(app).listen(3000);
