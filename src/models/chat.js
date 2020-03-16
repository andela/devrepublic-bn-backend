module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.STRING,
    userId: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {});
  Chat.associate = () => {
    // associations can be defined here
  };
  return Chat;
};
