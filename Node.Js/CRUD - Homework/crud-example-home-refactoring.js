var express = require('express');
var app = express();
app.use(express.json());
var port = 3000;
var fs = require('fs');

let players = JSON.parse(fs.readFileSync('./data/player.json', 'utf-8'));


//Get Players
let getAllPlayers = (req, res) => {
    res.status(200).json(
        {
            data: players
        }
    );
};


//Create new Player
let createPlayer = (req, res) => {
    const id = players[players.length - 1].id + 1;
    const newPlayer = Object.assign({id:id}, req.body);
    players.push(newPlayer);

    fs.writeFile('./data/player.json', JSON.stringify(players), err => {
        res.status(201).json(
            {data: players}
        )
    });
};


//Get player by ID
let getPlayerByID = (req, res) => {
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
};


//Update Player
let updatePlayerById = (req, res) => {
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
};



//Delete Player 
let deletePlayerById = (req, res) => {
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
};
app.get('/api/v1/players', getAllPlayers);
app.post('/api/v1/players', createPlayer);
app.get('/api/v1/players/:id', getPlayerByID);
app.patch('/api/v1/players/:id', updatePlayerById);
app.delete('/api/v1/players/:id', deletePlayerById);
app.listen(port);
