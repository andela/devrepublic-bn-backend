module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    status: DataTypes.ENUM('read, unread'),
    content: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    userId: DataTypes.STRING,
    requestId: DataTypes.STRING
  }, {});
  Notifications.associate = (models) => {
    Notifications.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
    Notifications.belongsTo(models.Request, {
      foreignKey: 'requestId',
      as: 'request',
      onDelete: 'CASCADE'
    });
  };
  return Notifications;
};
