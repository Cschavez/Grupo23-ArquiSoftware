const orm = require('../models');

// Get injections
async function getInjections() {
  const injection = await orm.Injection.findAll();
  return injection;
}

// Send injection
async function sendInjection(roomId, content) {
  const injection = await orm.Injection.create({ roomId, state: 'pending', content });
  return injection.toJSON();
}

// Modify injection
async function modifyInjection(id, state) {
  const injection = await orm.Injection.update({ state }, {
    where: {
      id
    }
  });
  return injection;
}

// Get injection
async function getInjection(roomId) {
  const injection = await orm.Injection.findAll({
    limit: 1,
    where: {
      roomId,
      state: 'aproved'
    },
    order: [ [ 'updatedAt', 'DESC' ]]
  });
  return injection[0];
}

module.exports = {
  getInjections,
  sendInjection,
  modifyInjection,
  getInjection
};
