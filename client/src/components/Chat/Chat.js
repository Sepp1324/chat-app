import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, set_name] = useState('');
    const [room, set_room] = useState('');

    const endpoint = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(endpoint);

        set_name(name);
        set_room(room);

        socket.emit('join', { name, room }, () => {});

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [endpoint], location.search);

    return <h1>Chat</h1>
}

export default Chat;