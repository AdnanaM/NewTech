var express = require("express");
var app = express();
var port =  3000;
app.get('/', function(req, res) {
    res.status(200).send('hello express');
});
app.listen(port);