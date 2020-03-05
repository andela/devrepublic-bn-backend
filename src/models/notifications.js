module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    status: DataTypes.ENUM('read, unread'),
    content: DataTypes.STRING,
    recieverEmail: DataTypes.STRING,
    recieverId: DataTypes.STRING
  }, {});
  Notifications.associate = () => {
  };
  return Notifications;
};
