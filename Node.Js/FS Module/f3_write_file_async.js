var fs = require('fs');
var path = require('path');

var content = "hello 2022";

var filePath = path.join(__dirname, "lib_write_file", "f1.txt");

fs.writeFile(filePath, content.trim(), function(err){
    if(err){
        console.log(err);
    }else{
        console.log("File created");
    }
});