var express = require('express');
var app = express();
app.use(express.json());
var port = 3000;
var fs = require('fs');

let players = JSON.parse(fs.readFileSync('./data/player.json', 'utf-8'));

//Get Players
app.get('/api/v1/players', function(req, res){
    res.status(200).json(
        {
            data: players
        }
    );
});


//Create new Player
app.post('/api/v1/players', function(req, res){
    const id = players[players.length - 1].id + 1;
    const newPlayer = Object.assign({id:id}, req.body);
    players.push(newPlayer);

    fs.writeFile('./data/player.json', JSON.stringify(players), err => {
        res.status(201).json(
            {data: players}
        )
    });
});


//Get player by ID
app.get('/api/v1/players/:id', function(req, res){
    const id = Number(req.params.id);
    const player = players.find(player => player.id === id);

    if(player === undefined){
        return res.status(404).json(
            {message: 'id not found'}
        )
    }
    res.status(200).json(
        {data: player}
    )
});



//Delete player
app.delete('/api/v1/players/:id', (req, res) => {
    const id = Number(req.params.id);
    const player = players.find(player => player.id === id);
    if(player === undefined){
        return res.status(404).json(
            {message: 'id not found'}
        )
    };

    var index = players.findIndex(obj => obj.id == id);
    players.splice(index, 1);
    fs.writeFile("./data/player.json", JSON.stringify(players), err => {
        res.status(200).json(               
            {
                status:"success delete",
                data:player               
            }
        )      
    });
});



//  Update - PATCH(UPDATE)
app.patch('/api/v1/players/:id', (req, res)=>{
    const id = Number(req.params.id)
    const player = players.find(el => el.id ===id);

    if(player === undefined){
        return res.status(404).json({
            status:'fail',
            message:"id not exist"   
        })
    };

    players[id].firstname = req.body.firstname;
    player.lastname = req.body.lastname;
    player.team = req.body.team;
    player.age = Number(req.body.age);
    players[id] = player;

    fs.writeFile("./data/player.json",JSON.stringify(players),err=>{
        res.status(200).json(
            {
                status:"success",
                data:players[id]       
            }
        )
    });
});
app.listen(port);


