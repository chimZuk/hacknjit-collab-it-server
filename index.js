const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chimzuk:4115Mama@collab-iw4gh.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const db = client.db("collab_it");
    const coll_users = db.collection("users");
    const coll_users_data = db.collection("users_data");

    if (err) {
        return console.log(err);
    }

    var user = {
        Username: "chimZuk",
        FirstName: "Dzmitry",
        LastName: "Kuzmitch",
        Password: "!4115Mama",
        Email: "dk497@njit.edu",
        ID: 0
    };

    var user_data = {
        text: [
            "One",
            "Two",
            "Three",
            "Four"
        ],
        UserID: 0,
        _id: ""
    }

    coll_users.insertOne(user, function(err, result) {
        console.log(result);
    });

    coll_users.find({ ID: user.ID }).toArray(function(err, result) {
        console.log(result);
    });

    coll_users_data.insertOne(user_data, function(err, result) {
        console.log(result);
    });

    client.close();
});*/