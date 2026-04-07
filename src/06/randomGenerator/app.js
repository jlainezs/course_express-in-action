var express = require("express");
var app = express();

app.get("/random/:min/:max", function (req, res) {
    var min = parseInt(req.params.min, 10);
    var max = parseInt(req.params.max, 10);

    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.send("Invalid parameters. Please provide valid integers for min and max.");
        return;
    }

    var result = Math.floor(Math.random() * (max - min)) + min;
    res.json({ result: result });
});

app.listen(3000, function () {
    console.log("Random generator app is listening on port 3000.");
});
