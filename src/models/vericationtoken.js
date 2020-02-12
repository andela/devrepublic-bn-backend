module.exports = (sequelize, DataTypes) => {
  const VericationToken = sequelize.define('VericationToken', {
    userId: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  VericationToken.associate = (models) => {
    VericationToken.belongsTo(models.User, {
      foreignKey: 'id',
      foreignKeyConstraint: true
    });
  };
  return VericationToken;
};
