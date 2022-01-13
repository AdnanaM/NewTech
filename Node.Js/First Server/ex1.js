var http = require('http');
http.createServer(function (req, res){
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write('Brasov Romania');
    res.end();
}).listen(3000);