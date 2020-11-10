var express = require('express');
var router = express.Router();
var middleware = require('../middlewares/AuthMiddleware')
const {
    userJoin,
  } = require('../utils/users');
  
  const {
    roomsGet,
    roomsPost
  } = require('../utils/rooms');

router.get('/rooms/', middleware.ValidateAdmin, async function(req, res) {
    const rooms = await roomsGet();
    res.json(rooms);
  });
  
router.get('/room/', middleware.Validate, async (req, res) => {
    const room = await roomGet(req.body.roomID);
    res.json(room);
});

router.post('/room', middleware.Validate, async (req, res) => {
    const room = await roomsPost(req.body.name);
    res.json(room);
});

router.post('/user', middleware.Validate, async (req, res) => {
    const user = await userJoin('api', req.body.username, req.body.room, req.body.mail)
    res.json(user);
});

module.exports = router;