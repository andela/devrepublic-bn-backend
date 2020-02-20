import db from '../models';
import Response from '../utils/ResponseHandler';
import { verifyToken } from '../utils/tokenHandler';

/**
 * @description protect route class
 * @class protectRoutes
 */
export default class protectRoutes {
  /** @description validate if user is signup
   * @static
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} next
   * @memberof protectRoutes
   */
  static async verifyUser(req, res, next) {
    try {
      const { token } = req.headers;
      if (!token) {
        return Response.errorResponse(res, 401, res.__('No token provided'));
      }
      const payload = verifyToken(token);
      const user = await db.User.findOne({
        where: {
          id: payload.id
        }
      });
      if (!user) {
        return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
      }
      req.payload = payload;
      req.user = user;
      return next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return Response.errorResponse(res, 400, res.__('token must be provided and valid'));
      }
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static async verifyRequester(req, res, next) {
    const { user } = req;
    if (user.role !== 'requester') Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
    next();
  }
}
