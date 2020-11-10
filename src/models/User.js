module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      socket: DataTypes.STRING,
      mail: DataTypes.STRING,
      blocked: DataTypes.BOOLEAN,
    },
    {}
  );

  User.associate = function associate(models) {
    models.User.belongsTo(models.Room);

    // associations can be defined here. This method receives a models parameter.
  };
  sequelize.sync();
  return User;
};
