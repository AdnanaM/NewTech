var fs = require('fs');
var path = require('path');

var content = "hello 2022";

fs.writeFileSync('fisier.txt', content.trim());