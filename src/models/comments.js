module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    requestId: DataTypes.STRING,
    commentOwner: DataTypes.STRING,
    comment: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {});
  Comments.associate = (models) => {
    Comments.belongsTo(models.Request, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comments.belongsTo(models.User, {
      foreignKey: 'commentOwner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Comments;
};
