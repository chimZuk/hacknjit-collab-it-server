let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);
let bodyParser = require('body-parser');
let path = require('path');
let socketIO = require('socket.io');
let io = socketIO(server);
let api = require('./routes/api');

const port = process.env.PORT || 80;

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

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', message);
        console.log("here")
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});