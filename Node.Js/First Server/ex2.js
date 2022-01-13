var http = require('http');
http.createServer(function (req, res){
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    let path = req.url;
    if(path === "/city")
        res.write('Paris')
    else if(path === "/country")
        res.write('Romania')
    else
        res.write("I dont't know how to respond to that")
    
    res.end();
}).listen(3000);