const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
global.crypto = require('crypto')
const socketio = require('socket.io');
var bodyParser = require('body-parser')

const formatMessage = require('./utils/messages');
var routes = require('./routes');
var apiRoutes = require('./routes/api');


const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  sendMail
} = require('./utils/users');

const {
  roomsGet,
  roomsPost,
  roomGet,
} = require('./utils/rooms');

const app = express();
app.use(cors());
app.use( bodyParser.json() );
app.use('/', routes);
app.use('/api', apiRoutes);

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));
const botName = 'Chat Bot';



// Run when client connects
io.on('connection', async socket => {
  const rooms = await roomsGet();
  socket.emit('rooms', rooms)

  socket.on('joinRoom', async ({ username, room, mail }) => {
    const user = await userJoin(socket.id, username, room, mail);

    socket.join(user.RoomId);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Bienvenido a myfirstchatapp.me!'));

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
      users: await getRoomUsers(user.RoomId)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', async msg => {
    const user = await getCurrentUser(socket.id);

    io.to(user.RoomId).emit('message', formatMessage(user.username, msg));
  });

  socket.on('postRoom', async ({name}) => {
    await roomsPost(name);

    const rooms = await roomsGet();
    socket.emit('rooms', rooms);
  })

  socket.on('sendMail', async ({username}) => {
    await sendMail(username);
  })

  // Runs when client disconnects
  socket.on('disconnect', async () => {
    const user = await userLeave(socket.id);

    if (user) {
      io.to(user.RoomId).emit(
        'message',
        formatMessage(botName, `${user.username} ha dejado el chat`)
      );

      // Send users and room info
      io.to(user.RoomId).emit('roomUsers', {
        room: user.RoomId,
        users: await getRoomUsers(user.RoomId)
      });
    }
  });
});


module.exports = server;
