let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);
let bodyParser = require('body-parser');
let path = require('path');
let socketIO = require('socket.io');
let io = socketIO(server);
let api = require('./routes/api');

let port = process.env.PORT || 80;

var messageCounter = 0;

app.use('/api', api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../collab-it/')));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../collab-it/index.html'));
});

let players = [];

let messages = [];

let word = "pizza";

io.on('connection', (socket) => {
    console.log('CONNECTION: User connected');

    io.emit('users', players.sort((a, b) => (a.score < b.score) ? 1 : -1));
    io.emit('messages', { messages: messages, word: word });

    socket.on('user-joined', (user) => {
        var pushed = false;
        user.main = false;
        user.score = 0;
        for (var i = 0; i < players.length; i++) {
            if (players[i].UserName == user.UserName) {
                io.emit('user-joined', {
                    userData: players[i],
                    players: players.sort((a, b) => (a.score < b.score) ? 1 : -1)
                });
                pushed = true;
                break;
            }
        }
        if (!pushed) {
            players.push(user);
            io.emit('user-joined', { userData: user, players: players.sort((a, b) => (a.score < b.score) ? 1 : -1) });
        }
    });

    socket.on('new-message', (message) => {
        message.messageID = messageCounter;
        message.hotness = 0;

        io.emit('new-message', message);
        messageCounter++;

        messages.push(message);

        if (message.text.trim().toLowerCase() == word) {
            clearInterval(timeInterval);
            clearTimeout(gameTimeout);
            restartGame(true, message);
        }
    });

    socket.on('message-hotness', (message) => {
        for (var i = 0; i < messages.length; i++) {
            if (message.messageID == messages[i].messageID) {
                messages[i] = message;
            }
        }
        io.emit('message-hotness', message);
    });
});

let timeInterval;
let gameTimeout;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function restartGame(hasWinner, message = {}) {
    var secsCounter = 60;
    messages = [];

    for (var i = 0; i < players.length; i++) {
        players[i].main = false;
        if (players[i].UserName == message.senderName) {
            players[i].score++;
            players[i].main = true;
            io.emit('endgame', {
                nextPlayer: players[i],
                word: word,
                hasWinner: hasWinner
            });
        }
    }

    if (!hasWinner && players.length != 0) {
        var nextPlayer = getRandomInt(players.length);
        players[nextPlayer].main = true;
        io.emit('endgame', {
            nextPlayer: players[nextPlayer],
            word: word,
            hasWinner: hasWinner
        });
    }

    io.emit('users', players.sort((a, b) => (a.score < b.score) ? 1 : -1));
    io.emit('messages', { messages: messages, word: word });

    timeInterval = setInterval(function() {
        console.log(secsCounter + "s");
        io.emit('time', secsCounter);
        secsCounter--;
    }.bind(this), 1000);

    gameTimeout = setTimeout(function() {
        clearInterval(timeInterval);
        restartGame(false);
    }.bind(this), 61000)
}

restartGame();

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});