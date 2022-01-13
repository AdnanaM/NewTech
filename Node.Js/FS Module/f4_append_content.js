var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "lib_write_file", "f1.txt");

fs.appendFile(filePath, " I'm Adnana", function(err){
    if(err){
        console.log(err);
    }else{
        console.log("append succesfull");
    }
});