import jwt from 'jsonwebtoken';

const provideToken = (userId, userEmail) => {
  const token = jwt.sign({
    id: userId,
    email: userEmail
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
  return token;
};
export default provideToken;
