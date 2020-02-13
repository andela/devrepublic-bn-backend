import dotenv from 'dotenv';
import db from '../models';
import Response from '../utils/ResponseHandler';

dotenv.config();
/**
 * @description Verification Controller
 * @class VericationController
 */
export default class VerificationController {
  /**
     * @description Account verification method method
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} User
     * @memberof verificationController
     */
  static async verifyAccount(req, res) {
    try {
      const existingEmail = db.User.findOne({
        where: { email: req.query.email }
      });
      if (existingEmail.isVerified) {
        return Response.signupResponse(res, 202, 'User is Verified');
      }
      const existingToken = await db.VericationToken.findOne({
        where: { token: req.query.token }
      });
      const unverifiedId = existingToken.userId;
      const newUser = await db.User.findOne({
        where: { id: unverifiedId }
      });
      newUser.update({ isVerified: true });
      return Response.signupResponse(res, 200, `User with ${newUser.email} has been verified`);
    } catch (error) {
      return Response.errorResponse(res, 500, `${error.message}`);
    }
  }
}
