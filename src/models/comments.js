module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    requestId: DataTypes.STRING,
    commmentOwner: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {});
  Comments.associate = (models) => {
    Comments.belongsTo(models.Request, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comments.belongsTo(models.User, {
      foreignKey: 'commmentOwner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Comments;
};
