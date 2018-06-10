var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected: ', socket.id);
    socket.on('disconnect', function () {
        console.log('user disconnected', socket.id);
    });

    socket.on('message', function(data){
        console.log('message received!', data);
        socket.broadcast.emit('message', data, socket.id);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});