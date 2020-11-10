module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
  }, {});

  Room.associate = function associate(models) {
    models.Room.hasMany(models.Message);
    models.Room.hasMany(models.Injection, { foreignKey: 'roomId' });
  };
  sequelize.sync();
  return Room;
};
