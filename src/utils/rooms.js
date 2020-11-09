const orm = require('../models');


async function roomsGet() {
    const rooms = await orm.Room.findAll();
    return rooms;
}

async function roomsPost(name) {
    const room = await orm.Room.create({ name });
    return room.toJSON();
}

module.exports = {
    roomsGet,
    roomsPost,
};
  