const orm = require('../models');
const fetch = require('node-fetch');

// Join user to chat
async function userJoin(socket, username, room, mail) {
  const user = await orm.User.create({RoomId: room, socket, username, mail });
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

async function sendMail(username) {
  const user = await orm.User.findOne({where: { username }});
  await fetch('https://b6z5zn3g0k.execute-api.us-east-1.amazonaws.com/default/sendMail', {
    method: 'post',
    body:    JSON.stringify({email: user.mail}),
    headers: { 'Content-Type': 'application/json' },
  });

}


module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  roomsGet,
  sendMail
};
