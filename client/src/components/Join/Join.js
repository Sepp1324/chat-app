import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './join.css'

const Join = () => {
    const [name, set_name] = useState('');
    const [room, set_room] = useState('');

    return <div className="join-outer-container">
        <div className="join-inner-container">
            <h1 className="heading">Join</h1>
            <div><input type="text" placeholder="Name" className="join-input" onChange={(event) => set_name(event.target.value)} /></div>
            <div><input type="text" placeholder="Room" className="join-input mt-20" onChange={(event) => set_room(event.target.value)} /></div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">Sign In</button>
            </Link>
        </div>
    </div>
}

export default Join;