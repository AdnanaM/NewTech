const fs = require('fs');
let toys = JSON.parse(fs.readFileSync(__dirname + "/../data/data.json", 'utf-8'));


exports.getAllToys = (req, res) => {
    res.status(200).json(       
        {
            status:"success",
            data:toys       
        }
    );
};



exports.createToy = (req, res) => {
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
};



exports.getToyById = (req, res) => {
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
};



exports.updateToyById = (req, res) => {
    const id = Number(req.params.id);
    const toy = toys.find(elm=>elm.id === id);
    if(toy === undefined){
        return res.status(404).json({
            status: "error",
            message: "id not exist"
        });
    }

    toys[id].name = req.body.name;
    toy.description = req.body.description;
    toy.price = Number(req.body.price);
    toy.picture = req.body.picture;
    toys[id] = toy;
    

    fs.writeFile("./data/data.json",JSON.stringify(toys),err=>{
        res.status(200).json (               
        {
            status:"success",
            data:toys[id]         
        })       
    });
};



exports.deleteToyById = (req, res) => {
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
};