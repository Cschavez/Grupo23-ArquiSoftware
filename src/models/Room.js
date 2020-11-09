module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
  }, {});

  Room.associate = function associate(models) {
    models.Room.hasMany(models.Message);
  };
  sequelize.sync();
  return Room;
};
