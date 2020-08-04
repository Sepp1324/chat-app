const express = require('express');
const socket_io = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

io.on('connection', (socket) => {
    console.log('Connection established!');

    socket.on('disconnect', () => {
        console.log('Connection terminated!');
    });
});

app.use(router);
server.listen(port, () => console.log(`Server has started on port ${port}`));
