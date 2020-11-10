'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Injections', 'content', {
      type: Sequelize.TEXT
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Injections', 'content', {
      type: Sequelize.STRING
    })
  }
};
