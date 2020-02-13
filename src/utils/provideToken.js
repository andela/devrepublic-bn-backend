import jwt from 'jsonwebtoken';

const provideToken = (userId, isVerified) => {
  const token = jwt.sign({
    id: userId,
    isVerfied: isVerified
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
  return token;
};
export default provideToken;
