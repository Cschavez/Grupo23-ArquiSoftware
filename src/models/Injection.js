module.exports = (sequelize, DataTypes) => {
  const Injection = sequelize.define('Injection', {
    roomId: DataTypes.INTEGER,
    state: DataTypes.ENUM('pending', 'aproved', 'rejected'),
    content: DataTypes.TEXT,
  }, {});

  Injection.associate = function associate(models) {
    models.Injection.belongsTo(models.Room, { foreignKey: 'roomId' })
  };

  sequelize.sync()

  return Injection;
};
