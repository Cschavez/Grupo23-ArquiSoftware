var express = require("express");
var router = express.Router();
var middleware = require("../middlewares/AuthMiddleware");

const {
  userJoin,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
} = require("../utils/users");

const {
  roomsGet,
  roomsPost,
  roomDelete
} = require("../utils/rooms");

const {
  getInjections,
  sendInjection,
  modifyInjection,
  getInjection
} = require('../utils/injections');

router.get("/rooms/", middleware.ValidateAdmin, async function (req, res) {
  const rooms = await roomsGet();
  res.json(rooms);
});

router.get("/room/", middleware.Validate, async (req, res) => {
  const room = await roomGet(req.body.roomID);
  res.json(room);
});

router.post("/room", middleware.Validate, async (req, res) => {
  const room = await roomsPost(req.body.name);
  res.json(room);
});

router.delete("/room", middleware.ValidateAdmin, async (req, res) => {
  const { id } = req.body;
  const room = await roomDelete(id);
  res.json(room);
});

router.post("/user", middleware.Validate, async (req, res) => {
  const user = await userJoin(
    "api",
    req.body.username,
    req.body.room,
    req.body.mail
  );
  res.json(user);
});

router.get("/users", middleware.ValidateAdmin, async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.get("/user", middleware.ValidateAdmin, async (req, res) => {
  const { id } = req.body;
  const user = await getUser(id);
  if (user) {
    res.json(user);
  } else {
    res.json("No existe un usuario con ese id");
  }
});

router.patch("/user", middleware.ValidateAdmin, async (req, res) => {
  const { id, name, email } = req.body;
  const user = await updateUser(id, name, email);
  res.json(user);
});

router.delete("/user", middleware.ValidateAdmin, async (req, res) => {
  const user = await deleteUser(req.body.id);
  res.json(user);
});

router.get('/inject', middleware.Validate, async (_, res) => {
  const injection = await getInjections();
  res.json(injection);
});

router.post('/inject', middleware.Validate, async (req, res) => {
  const injection = await sendInjection(req.body.roomId, req.body.content);
  res.json(injection);
});

router.put('/inject/:id', middleware.Validate, async (req, res) => {
  const injection = await modifyInjection(req.params.id, req.body.state);
  res.json(injection);
});

router.get('/inject/:roomId', middleware.Validate, async (req, res) => {
  const injection = await getInjection(req.params.roomId);
  res.json(injection);
});

module.exports = router;
