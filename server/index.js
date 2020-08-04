const express = require('express');
const socket_io = require('socket.io');
const http = require('http');

const { add_user, remove_user, get_user, get_users_in_room } = require('./users');

const port = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = add_user({ id: socket.id, name, room });

        if (error) {
            return callback(error);
        }

        socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to the room ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room!` });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = get_user(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('Connection terminated!');
    });
});

app.use(router);
server.listen(port, () => console.log(`Server has started on port ${port}`));
