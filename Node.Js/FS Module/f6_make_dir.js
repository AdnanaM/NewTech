var fs = require('fs');

if(!fs.existsSync('mydir')){
    fs.mkdir('mydir', function(err){
        if(err){
            console.log(err);
        }else{
            console.log('directory created')
        }
    })
}else{
    console.log('directoru exists');
}