const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
    if(err) console.log(err);
    const db = client.db("test"); 
    const col = db.collection("obiecte"); 
    let player1 = {
        "name": { "first":"Ion", "last":"Alexandru" },
        "age": 18,
        "team": "Lakers",
    }

    let player2 = {
        "name": { "first":"Stoica", "last":"Dragos" },
        "age": 25,
        "team": "United",
    }

    let player3 = {
        "name": { "first":"Voicu", "last":"Marius" },
        "age": 37,
        "team": "Buldogs",
    }

    const p1 = await col.insertOne(player1);
    const p2 = await col.insertOne(player2);
    const p3 = await col.insertOne(player3);
    client.close();
});