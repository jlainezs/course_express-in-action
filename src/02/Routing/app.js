var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.send('This is the home page');
});

app.get('/about', function(req, res) {
    res.send('This is the about page');
});

app.get('/contact', function(req, res) {
    res.send('This is the contact page');
});

app.get('/hello/:who', function (req, res) {
    // security note: this is not a good idea in production code, as it allows for XSS attacks.
    // In production code, you should sanitize the input before using it.
    res.send('Hello ' + req.params.who);
});

app.use(function(req, res) {
    res.status(404);
    res.end('404!');
});

http.createServer(app).listen(3000);
