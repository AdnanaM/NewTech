var express = require('express');
var app = express();
var toyRouter = require('./api/toyRouter');
app.use(express.json());
app.use('/api/v1/toys', toyRouter);
var port = 3000;

app.use('/assets', express.static(__dirname + '/toys'));
app.listen(port);
