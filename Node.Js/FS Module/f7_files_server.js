var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    fs.readFile("./lib/first.html", function(err, content){
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(content);
        res.end();
    });
}).listen(3000);