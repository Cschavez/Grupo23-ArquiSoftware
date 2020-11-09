const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const {
  roomsGet,
  roomsPost
} = require('./utils/rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const botName = 'BattleChile Bot';

// Run when client connects
io.on('connection', async socket => {
  const rooms = await roomsGet();
  socket.emit('rooms', rooms)

  socket.on('joinRoom', async ({ username, room }) => {
    const user = await userJoin(socket.id, username, room);

    socket.join(user.RoomId);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Bienvenido a BattleChile!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.RoomId)
      .emit(
        'message',
        formatMessage(botName, `${user.username} ha entrado al chat`)
      );

    // Send users and room info
    io.to(user.RoomId).emit('roomUsers', {
      room: user.RoomId,
      users: getRoomUsers(user.RoomId)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.RoomId).emit('message', formatMessage(user.username, msg));
  });

  socket.on('postRoom', async ({name}) => {
    await roomsPost(name);

    const rooms = await roomsGet();
    socket.emit('rooms', rooms);
  })

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.RoomId).emit(
        'message',
        formatMessage(botName, `${user.username} ha dejado el chat`)
      );

      // Send users and room info
      io.to(user.RoomId).emit('roomUsers', {
        room: user.RoomId,
        users: getRoomUsers(user.RoomId)
      });
    }
  });
});

module.exports = server;
