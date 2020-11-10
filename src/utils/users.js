const orm = require("../models");
const fetch = require("node-fetch");

// Join user to chat
async function userJoin(socket, username, room, mail) {
  const user = await orm.User.create({ RoomId: room, socket, username, mail });
  return user.toJSON();
}

// Get current user
async function getCurrentUser(id) {
  const user = await orm.User.findOne({ where: { socket: id } });
  return user.toJSON();
}

// Get All users
async function getUsers() {
  const users = await orm.User.findAll();
  return users;
}

// User leaves chat
async function userLeave(id) {
  const user = await orm.User.findOne({ where: { socket: id } });
  if (user) {
    user.destroy();
    return user.toJSON();
  }
}

// Get room users
async function getRoomUsers(room) {
  const users = await orm.User.findAll({ where: { RoomId: room } });
  return users;
}

async function getUser(id) {
  const user = await orm.User.findOne({ where: { id } });
  if (user) {
    return user.toJSON();
  }
  return null;
}

async function updateUser(id, name, email) {
  const user = await orm.User.findOne({ where: { id } });
  await user.update({ username: name, mail: email });
  return user.toJSON();
}

async function roomsGet() {
  const rooms = await orm.Room.findAll();
  return rooms.toJSON();
}

async function deleteUser(id) {
  const user = await orm.User.findOne({ where: { id } });
  await user.update({ blocked: true });
  return user.toJSON();
}

async function sendMail(username) {
  const user = await orm.User.findOne({ where: { username } });
  await fetch(
    "https://b6z5zn3g0k.execute-api.us-east-1.amazonaws.com/default/sendMail",
    {
      method: "post",
      body: JSON.stringify({ email: user.mail }),
      headers: { "Content-Type": "application/json" },
    }
  );
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  roomsGet,
  sendMail,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
};
