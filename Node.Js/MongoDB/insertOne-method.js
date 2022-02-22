const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
    if(err) console.log(err);
    const db = client.db("test"); // Use the collection "people"
    const col = db.collection("people"); // Construct a document
    let personDocument1 = {
        "name": { "first":"Alan", "last":"Turing" },
        "birth": new Date(1912, 5, 23), 
        "death": new Date(1954, 5, 7),  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 1250000   
    }

    let personDocument2 = {
        "name": { "first":"Savu", "last":"Ion" },
        "birth": new Date(1912, 5, 23), 
        "death": new Date(1954, 5, 7),  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 140000   
    }

    let personDocument3 = {
        "name": { "first":"Simion", "last":"Maria" },
        "birth": new Date(1912, 5, 23), 
        "death": new Date(1954, 5, 7),  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 200000   
    }

    let personDocument4 = {
        "name": { "first":"Mazare", "last":"Liviu" },
        "birth": new Date(1912, 5, 23), 
        "death": new Date(1954, 5, 7),  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 90000   
    }

    let personDocument5 = {
        "name": { "first":"Robu", "last":"Liviu" },
        "birth": new Date(1912, 5, 23), 
        "death": new Date(1954, 5, 7),  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 170000   
    }
    const p1 = await col.insertOne(personDocument1);
    const p2 = await col.insertOne(personDocument2);
    const p3 = await col.insertOne(personDocument3);
    const p4 = await col.insertOne(personDocument4);
    const p5 = await col.insertOne(personDocument5);
    client.close();
});