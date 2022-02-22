const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
    if(err) console.log(err);
    try{
        const db = client.db("test"); 
        const col = db.collection("people"); 
        //const myDoc = await col.find().toArray();
        // const myDoc = await col.find({"views": 140000}).toArray();
        // const myDoc = await col.find({name: {first: "Mazare", last: "Liviu"}}).toArray();
        // const myDoc = await col.find({"views": {$gt: 135000}}).toArray();
        console.log(myDoc);
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
    }
});