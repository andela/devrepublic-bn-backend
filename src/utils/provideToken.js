import jwt from 'jsonwebtoken';

const provideToken = (userId, isVerified, email) => {
  const token = jwt.sign({
    id: userId,
    isVerified,
    email
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
  return token;
};
export default provideToken;
