'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('Injections', 'userId')
  },

  down: async (queryInterface) => {
    await queryInterface.createColumn('Injections', 'userId')
  }
};
