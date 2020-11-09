const orm = require('../models');

// Join user to chat
async function userJoin(socket, username, room) {
  console.log("la room es", room);
  const user = await orm.User.create({RoomId: room, socket, username });
  return user.toJSON();
}

// Get current user
async function getCurrentUser(id) {
  const user = await orm.User.findOne({where: { socket: id }});
  return user.toJSON();
}

// User leaves chat
async function userLeave(id) {
  const user = await orm.User.findOne({where: { socket: id }});
  if (user) {
    user.destroy();
    return user.toJSON();
  }
}

// Get room users
async function getRoomUsers(room) {
  const users = await orm.User.findAll({where: { RoomId: room }});
  return users
}

async function roomsGet() {
  const rooms = await orm.Room.findAll();
  return rooms.toJSON();
}


module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  roomsGet
};
