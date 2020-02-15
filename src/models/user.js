module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
<<<<<<< HEAD
    role: DataTypes.STRING,
=======
    signupMethod: DataTypes.STRING,
>>>>>>> ft(Login with Facebook and Google):
    isVerified: DataTypes.BOOLEAN
  }, {});
  User.associate = () => {
  };
  return User;
};
