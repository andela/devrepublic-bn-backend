module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    managerId: DataTypes.STRING,
    managerName: DataTypes.STRING,
    signupMethod: DataTypes.STRING,
    oAuthId: DataTypes.STRING,
    language: DataTypes.STRING,
    currency: DataTypes.STRING,
    department: DataTypes.STRING,
    gender: DataTypes.STRING,
    residence: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    image: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Bookings, {
      foreignKey: 'bookedBy',
    });
    User.hasMany(models.Request, {
      foreignKey: 'email',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};
