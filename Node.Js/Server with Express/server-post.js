var express = require("express");
var app = express();
var port =  3000;
app.get('/', function(req, res) {
    res.status(200).send('hello express');
});
app.post('/', function(req, res) {
        res.status(200).send('we support post request');
});
app.listen(port);