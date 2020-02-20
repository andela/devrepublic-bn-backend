import { verifyToken } from '../utils/tokenHandler';
import db from '../models';
import Response from '../utils/ResponseHandler';

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.query;
    const userInfo = verifyToken(token);
    const user = await db.User.findOne({
      where: {
        id: userInfo.id
      }
    });
    if (!user) {
      return Response.errorResponse(res, 403, res.__('you are not allowed to perform this action'));
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return Response.errorResponse(res, 400, res.__('token must be provided and valid'));
    }
    return Response.errorResponse(res, 500, res.__('server error'));
  }
};

const verifyRequester = async (req, res, next) => {
  const { payload } = req;
  const user = await db.User.findOne({
    where: {
      id: payload.id,
      role: 'requester'
    }
  });
  if (!user) Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
  req.user = user;
  next();
};

export { verifyUser, verifyRequester };
