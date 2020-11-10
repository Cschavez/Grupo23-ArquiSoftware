const orm = require("../models");

async function roomsGet() {
  const rooms = await orm.Room.findAll();
  return rooms;
}

async function roomGet(id) {
  const room = await orm.Room.findByPk(id);
  return room;
}

async function roomsPost(name) {
  const room = await orm.Room.create({ name });
  return room.toJSON();
}

async function roomDelete(id) {
  const room = await orm.Room.findByPk(id);
  await room.destroy();
  return room;
}

module.exports = {
  roomsGet,
  roomsPost,
  roomGet,
  roomDelete,
};
