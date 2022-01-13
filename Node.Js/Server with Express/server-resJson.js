var express = require("express");
var app = express();
var port = 3000;
app.get('/', function(req, res) {    
    res.send('<html><head></head><body>Hello world</body></html>');
});
app.get('/api', function(req, res) {    
    res.json({        
        firstname: "asaf",        
        lastname: "amir"    
    });
});
app.listen(port);