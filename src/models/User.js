module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    socket: DataTypes.STRING,
  }, {});

  User.associate = function associate(models) {
    models.User.belongsTo(models.Room);

    // associations can be defined here. This method receives a models parameter.
  };
  sequelize.sync()
  return User;
};
