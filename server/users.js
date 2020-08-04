const users = [];

const add_user = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existing_user = users.find((user) => user.room === room && user.name === name);

    if (existing_user) {
        return { error: "Username already taken!" };
    }

    const user = { id, name, room };

    user.push(user);
    return { user };
};

const remove_user = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const get_user = (id) => users.find((user) => user.id === id);

const get_users_in_room = (room) => users.filter((user) => user.room === room);

module.exports = { add_user, remove_user, get_user, get_users_in_room };