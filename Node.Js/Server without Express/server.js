var http = require("http");
var fs = require("fs");


let data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
let content = JSON.parse(data);
console.log(content);

function replaceTemplate(template, data){
    let output = template.replace(/{%PRODUCT%}/g, data.product);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%IMAGE%}/g, data.image);
    return output
}

let template = fs.readFileSync(`${__dirname}/templates/page.html`, "utf-8");

http.createServer(function(req,res){
    const baseUrl = req.protocol + "://" + req.headers.host + "/";
    const reqUrl = new URL(req.url, baseUrl);
    let path = reqUrl.pathname;

    if(path === "/"){
        res.writeHead(200, {"Content-Type" : "text/html"});
        const output = replaceTemplate(template, content[0]);
        res.end(output);
    }else if(path === "/product"){
        res.end("<h1>Product</h1>")
    }else if(path === "/persons"){
        res.end("<h1>Persons</h1>")
    }else if(path === "/api"){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end("api");
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>Page not found</h1>");
    }
}).listen(3000);