import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../utils/ResponseHandler';

dotenv.config();
/**
 *
 * @description Authentication Controller
 * @class AuthController
 */
export default class validateParams {
  /**
     * @description Validate Parameters
     * @static
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     * @returns {Object} User
     * @memberof validateParams
     */
  static async validateToken(req, res, next) {
    try {
      const {
        token,
        email
      } = req.query;
      const decodeToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
      if (decodeToken.email !== email) {
        return Response.errorResponse(res, 401, 'Sorry, you are not authorized to access this page.');
      }
      next();
    } catch (error) {
      return Response.errorResponse(res, 500, `${error.message}`);
    }
  }
}
