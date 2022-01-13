var express = require("express");
var app = express();
var port = 3000;

app.get("/api/name", function(req, res){
    res.send("Adnana Muresan");
});
app.get("/students/number", function(req, res){
    let random = Math.floor(Math.random()* 100);
    res.status(200).send(`${random}`);
});
app.post("/courses/n1ton2", function(req, res){
    let r1 = Math.random();
    let r2 = r1 * 1000;
    let r3 = Math.floor(r2);
    let r4 = r3 + 1000;
    res.send(r4.toString());
});
app.listen(port);
console.log(":)");

