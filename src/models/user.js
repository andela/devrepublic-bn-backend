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
    isVerified: DataTypes.BOOLEAN,
    emailNotifications: DataTypes.BOOLEAN
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
    User.hasMany(models.Request, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Comments, {
      foreignKey: 'commentOwner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Notifications, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
