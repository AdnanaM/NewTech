var fs = require('fs');

fs.rename("./lib_write_file/f1.txt", "f1 after.txt", function(err){
    if(err){
        console.log(err);
    }else{
        console.log("renamed");
    }
});