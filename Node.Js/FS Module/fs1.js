const fs = require('fs');
const path = require('path');

var filePath = path.join(__dirname, 'lib', 'second.html');
var stats = fs.statSync(filePath);

if(stats.isFile()){
    fs.readFile(filePath, "utf-8", function(err, contents){
        console.log(contents);
    })
}