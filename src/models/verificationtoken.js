module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    userId: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  VerificationToken.associate = (models) => {
    VerificationToken.belongsTo(models.User, {
      foreignKey: 'id',
      foreignKeyConstraint: true
    });
  };
  return VerificationToken;
};
