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
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chimzuk:4115Mama@collab-iw4gh.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("collab_it").collection("users");
    client.close();
});

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

let init_toppings = [{
        "name": "White Cheese",
        "src": "../../../../assets/img/white-cheese.png",
        "icon": "../../../../assets/img/white-cheese_ico.png",
        "type": "toppings"
    },
    {
        "name": "Parmigiano",
        "src": "../../../../assets/img/parmigiano.png",
        "icon": "../../../../assets/img/parmigiano_ico.png",
        "type": "toppings"
    },
    {
        "name": "Ham",
        "src": "../../../../assets/img/ham.png",
        "icon": "../../../../assets/img/ham_ico.png",
        "type": "toppings"
    },
    {
        "name": "Chicken",
        "src": "../../../../assets/img/chicken.png",
        "icon": "../../../../assets/img/chicken_ico.png",
        "type": "toppings"
    },
    {
        "name": "Bacon",
        "src": "../../../../assets/img/bacon.png",
        "icon": "../../../../assets/img/bacon_ico.png",
        "type": "toppings"
    },
    {
        "name": "Pepperoni",
        "src": "../../../../assets/img/pepperoni.png",
        "icon": "../../../../assets/img/pepperoni_ico.png",
        "type": "toppings"
    },
    {
        "name": "Sausage",
        "src": "../../../../assets/img/sausage.png",
        "icon": "../../../../assets/img/sausage_ico.png",
        "type": "toppings"
    },
    {
        "name": "Tomatoes",
        "src": "../../../../assets/img/tomatoes.png",
        "icon": "../../../../assets/img/tomatoes_ico.png",
        "type": "toppings"
    },
    {
        "name": "Peppers",
        "src": "../../../../assets/img/peppers.png",
        "icon": "../../../../assets/img/peppers_ico.png",
        "type": "toppings"
    },
    {
        "name": "Mushrooms",
        "src": "../../../../assets/img/mushrooms.png",
        "icon": "../../../../assets/img/mushrooms_ico.png",
        "type": "toppings"
    },
    {
        "name": "Pineapples",
        "src": "../../../../assets/img/pineapples.png",
        "icon": "../../../../assets/img/pineapples_ico.png",
        "type": "toppings"
    },
    {
        "name": "Basil",
        "src": "../../../../assets/img/basil.png",
        "icon": "../../../../assets/img/basil_ico.png",
        "type": "toppings"
    }
];
let init_base = [{
        "name": "Square",
        "src": "../../../../assets/img/square_ico.png",
        "icon": "../../../../assets/img/square_ico.png",
        "type": "base"
    },
    {
        "name": "Round",
        "src": "../../../../assets/img/round.png",
        "icon": "../../../../assets/img/round_ico.png",
        "type": "base"
    }
];
let init_sauces = [{
        "name": "Ranch",
        "src": "../../../../assets/img/ranch.png",
        "icon": "../../../../assets/img/ranch_ico.png",
        "type": "sauces"
    },
    {
        "name": "Tomato",
        "src": "../../../../assets/img/tomato.png",
        "icon": "../../../../assets/img/tomato_ico.png",
        "type": "sauces"
    }
];
let init_pizza = [];

let toppings = [{
        "name": "White Cheese",
        "src": "../../../../assets/img/white-cheese.png",
        "icon": "../../../../assets/img/white-cheese_ico.png",
        "type": "toppings"
    },
    {
        "name": "Parmigiano",
        "src": "../../../../assets/img/parmigiano.png",
        "icon": "../../../../assets/img/parmigiano_ico.png",
        "type": "toppings"
    },
    {
        "name": "Ham",
        "src": "../../../../assets/img/ham.png",
        "icon": "../../../../assets/img/ham_ico.png",
        "type": "toppings"
    },
    {
        "name": "Chicken",
        "src": "../../../../assets/img/chicken.png",
        "icon": "../../../../assets/img/chicken_ico.png",
        "type": "toppings"
    },
    {
        "name": "Bacon",
        "src": "../../../../assets/img/bacon.png",
        "icon": "../../../../assets/img/bacon_ico.png",
        "type": "toppings"
    },
    {
        "name": "Pepperoni",
        "src": "../../../../assets/img/pepperoni.png",
        "icon": "../../../../assets/img/pepperoni_ico.png",
        "type": "toppings"
    },
    {
        "name": "Sausage",
        "src": "../../../../assets/img/sausage.png",
        "icon": "../../../../assets/img/sausage_ico.png",
        "type": "toppings"
    },
    {
        "name": "Tomatoes",
        "src": "../../../../assets/img/tomatoes.png",
        "icon": "../../../../assets/img/tomatoes_ico.png",
        "type": "toppings"
    },
    {
        "name": "Peppers",
        "src": "../../../../assets/img/peppers.png",
        "icon": "../../../../assets/img/peppers_ico.png",
        "type": "toppings"
    },
    {
        "name": "Mushrooms",
        "src": "../../../../assets/img/mushrooms.png",
        "icon": "../../../../assets/img/mushrooms_ico.png",
        "type": "toppings"
    },
    {
        "name": "Pineapples",
        "src": "../../../../assets/img/pineapples.png",
        "icon": "../../../../assets/img/pineapples_ico.png",
        "type": "toppings"
    },
    {
        "name": "Basil",
        "src": "../../../../assets/img/basil.png",
        "icon": "../../../../assets/img/basil_ico.png",
        "type": "toppings"
    }
];
let base = [{
        "name": "Square",
        "src": "../../../../assets/img/square_ico.png",
        "icon": "../../../../assets/img/square_ico.png",
        "type": "base"
    },
    {
        "name": "Round",
        "src": "../../../../assets/img/round.png",
        "icon": "../../../../assets/img/round_ico.png",
        "type": "base"
    }
];
let sauces = [{
        "name": "Ranch",
        "src": "../../../../assets/img/ranch.png",
        "icon": "../../../../assets/img/ranch_ico.png",
        "type": "sauces"
    },
    {
        "name": "Tomato",
        "src": "../../../../assets/img/tomato.png",
        "icon": "../../../../assets/img/tomato_ico.png",
        "type": "sauces"
    }
];
let pizza = [];

let pizzatypes = [{
        name: "plain",
        ingridients: ["mozzarella", "basil"]
    },
    {
        name: "margherita",
        ingridients: ["tomatoes", "mozzarella", "basil"]
    },
    {
        name: "pepperoni",
        ingridients: ["round", "pepperoni", "mozzarella", "basil"]
    },
    {
        name: "sausage",
        ingridients: ["round", "sausage", "mozzarella", "basil"]
    },
    {
        name: "bacon",
        ingridients: ["round", "bacon", "mozzarella", "basil"]
    },
    {
        name: "hawaian",
        ingridients: ["round", "pineapples", "ham", "mozzarella", "basil"]
    },
    {
        name: "white",
        ingridients: ["round", "white-cheese", "basil"]
    },
    {
        name: "mushroom",
        ingridients: ["round", "mushrooms", "mozzarella", "basil"]
    },
    {
        name: "margherita",
        ingridients: ["round", "tomatoes", "mozzarella", "basil"]
    },
    {
        name: "chicken-ranch",
        ingridients: ["round", "chicken", "ranch", "mozzarella", "basil"]
    },
    {
        name: "chicken-parm",
        ingridients: ["round", "chicken", "parmigiano", "mozzarella", "basil"]
    }
]

io.on('connection', (socket) => {
    console.log('CONNECTION: User connected');

    io.emit('users', players.sort((a, b) => (a.score < b.score) ? 1 : -1));
    io.emit('messages', { messages: messages, word: word });
    io.emit('pizza-data', {
        pizza: pizza,
        sauces: sauces,
        base: base,
        toppings: toppings
    });

    socket.on('user-joined', (user) => {
        var pushed = false;
        user.main = false;
        if (!user.score) {
            user.score = 0;
        }
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

        if (message.text.trim().toLowerCase() == word && !message.main) {
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

    socket.on('pizza-drag', (message) => {
        pizza = message.pizza;
        toppings = message.toppings;
        sauces = message.sauces;
        base = message.base;
        io.emit('pizza-data', message);
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
    var scores = [];

    if (hasWinner) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].main) {
                if (message.time > 30) {
                    players[i].score += 0;
                } else {
                    if (message.time < 31 && message.time > 10) {
                        players[i].score -= 0.1;
                    } else {
                        players[i].score -= 0.3;
                    }
                }
                if (players[i].score < 0) {
                    players[i].score = 0;
                }
                break;
            }
        }
    } else {
        for (var i = 0; i < players.length; i++) {
            if (players[i].main) {
                players[i].score -= 0.5;
                if (players[i].score < 0) {
                    players[i].score = 0;
                }
                break;
            }
        }
    }

    players.forEach(function(el) {
        scores.push(el);
    });

    players = [];
    io.emit('ping', { message: "ping" });

    setTimeout(function() {
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < scores.length; j++) {
                if (players[i].UserName == scores[j].UserName) {
                    players[i].score = scores[j].score;
                }
            }
        }

        pizza = init_pizza;
        toppings = init_toppings;
        sauces = init_sauces;
        base = init_base;
        for (var i = 0; i < players.length; i++) {
            players[i].main = false;
            if (players[i].UserName == message.senderName) {
                if (message.time > 30) {
                    players[i].score += 1;
                } else {
                    if (message.time < 31 && message.time > 10) {
                        players[i].score += 0.7;
                    } else {
                        players[i].score += 0.3;
                    }
                }

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

        var nextPizza = getRandomInt(pizzatypes.length);
        word = pizzatypes[nextPizza].name;

        io.emit('users', players.sort((a, b) => (a.score < b.score) ? 1 : -1));
        io.emit('messages', { messages: messages, word: word });
        io.emit('pizza-data', {
            pizza: pizza,
            sauces: sauces,
            base: base,
            toppings: toppings
        });

        timeInterval = setInterval(function() {
            io.emit('time', secsCounter);
            secsCounter--;
            console.log(word);
        }.bind(this), 1000);

        gameTimeout = setTimeout(function() {
            clearInterval(timeInterval);
            restartGame(false);
        }.bind(this), 61000)
    }, 1000);
}

restartGame();

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});