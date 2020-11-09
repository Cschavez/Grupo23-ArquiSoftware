module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {});

  Message.associate = function associate(models) {
    models.Message.belongsTo(models.Room);
  };

  return Message;
};
