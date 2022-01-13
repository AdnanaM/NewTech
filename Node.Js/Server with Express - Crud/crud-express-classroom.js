var express = require("express");
var fs = require("fs");
var app = express();
var port = 3000;
app.use(express.json());




//Get all toys - GET(READ)
app.use('/assets', express.static(__dirname + '/toys'));
let toys = JSON.parse(fs.readFileSync("./data/data.json", 'utf-8'));
app.get('/api/v1/toys', function(req, res) {
    res.status(200).json(       
        {
            status:"success",
            data:toys       
        })
});


//Add new toy - POST(CREATE)
app.use('/assets', express.static(__dirname + '/toys'));
app.post('/api/v1/toys',(req, res)=>{
    const id = toys[toys.length-1].id +1;
    console.log(id);
    const newToy = Object.assign({id:id},req.body);
    console.log(req.body);
    toys.push(newToy);
    fs.writeFile("./data/data.json",JSON.stringify(toys),err=>{
        res.status(201).json (               
        {
            status:"success",
            data:toys               
        })       
    });
});


//Get toy by Id 
app.get('/api/v1/toys/:id',(req, res)=>{
    const id = Number(req.params.id);
    const toy = toys.find(elm=>elm.id === id);
    if(toy === undefined){
        return res.status(404).json({
            status: "error",
            message: "id not exist"
        });
    }else{
        return res.status(200).json({
            status: "success",
            data: toy
        });
    };
    
});



//  Update - PATCH(UPDATE)
app.patch('/api/v1/toys/:id', (req, res) => {
    const id = Number(req.params.id);
    const toy = toys.find(elm=>elm.id === id);
    if(toy === undefined){
        return res.status(404).json({
            status: "error",
            message: "id not exist"
        });
    }else{
        toys[id].name = req.body.name;
        toy.description = req.body.description;
        toy.price = Number(req.body.price);
        toy.picture = req.body.picture;
        toys[id] = toy;
    }

    fs.writeFile("./data/data.json",JSON.stringify(toys),err=>{
        res.status(200).json (               
        {
            status:"success",
            data:toys[id]         
        })       
    });
});


//Delete toy by ID (DELETE)
app.delete('/api/v1/toys/:id',(req, res)=>{
    const id = Number(req.params.id)
    const toy = toys.find(el=>el.id === id);
    if(toy===undefined){
        return res.status(404).json({
            status:'fail',
            message:"id not exist"               
        })       
    }
    var index = toys.findIndex(obj=>obj.id == id);
    toys.splice(index, 1)
    fs.writeFile("./data/data.json",JSON.stringify(toys),err=>{
        res.status(200).json(               
            {
                status:"success delete",
                data:toy               
            }
        )       
    });
})
app.listen(port);



