const fs = require('fs');
const path = require('path');

fs.readdir("./lib", function(err, files){
    files.forEach(function(file_name){
        var filePath = path.join(__dirname, 'lib', file_name);
        var stats = fs.statSync(filePath);

        if(stats.isFile()){
            fs.readFile(filePath, "utf-8", function(err, contents){
                console.log(contents);
            });
        }
    });
});


