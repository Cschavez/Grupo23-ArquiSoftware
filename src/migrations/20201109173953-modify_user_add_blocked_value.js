module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      "Users", // table name
      "blocked", // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    ),
  down: (queryInterface) => queryInterface.removeColumn("Users", "blocked"),
};
