var http = require('http');

var server_function = function(req, res) {    
    res.write('Muresan Adnana');    
    res.end();
};

var server = http.createServer(server_function);
server.listen(3000);