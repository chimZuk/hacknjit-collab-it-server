// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const port = process.env.PORT || '3000';
const bodyParser = require('body-parser');
const api = require('./routes/api');
const io = require('socket.io')(http);
const app = express();

app.use('/api', api);
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../collab-it/')));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../collab-it/index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        console.log(message);
    });
});

http.createServer(app).listen(port, () => console.log(`API running on localhost:${port}`));





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