// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/chimZuk')));

// Set our api routesclea
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../collab-it/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

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