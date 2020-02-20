import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Response from './ResponseHandler';

dotenv.config();

export const provideToken = (userId, isVerified, email, role) => {
  const token = jwt.sign({
    id: userId,
    isVerified,
    email,
    role
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1d' });
  return token;
};
export const verifyToken = token => jwt.verify(token, process.env.JWTPRIVATEKEY);

export const decode = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return Response.errorResponse(res, 401, 'No token provided');
  }
  try {
    const decoded = verifyToken(token);
    req.payload = decoded;
    return next();
  } catch (error) {
    return Response.errorResponse(res, 401, 'Invalid token');
  }
};
