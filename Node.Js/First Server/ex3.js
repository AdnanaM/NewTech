var http = require('http');
var url = require('url');
http.createServer(function (req, res){
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    const baseUrl = req.protocol + "://" + req.headers.host + "/";
    console.log(baseUrl);

    const reqUrl = new URL(req.url, baseUrl);
    console.log(reqUrl);

    let pathname = reqUrl.pathname;
    console.log(pathname);

    let searchParams = new URLSearchParams(reqUrl.searchParams);
    console.log(searchParams);

    let a = Number(searchParams.get('a'));
    let b = Number(searchParams.get('b'));

    if(pathname === "/plus" && a && b){
        let sum = a + b;
        res.write(sum.toString());
    }else if(pathname === "/mult" && a && b){
        let mult = a * b; 
        res.write(mult.toString())
    }else{
        res.write("I dont't know how to respond to that")
    }
    res.end();
}).listen(3000);