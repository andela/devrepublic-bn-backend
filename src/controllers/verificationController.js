import dotenv from 'dotenv';
import db from '../models';
import Response from '../utils/ResponseHandler';

dotenv.config();
/**
 * @description Verification Controller
 * @class VerificationController
 */
export default class VerificationController {
  /**
     * @description Account verification method method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} User
     * @memberof verificationController
     */
  static async verifyAccount(req, res) {
    try {
      const existingUser = await db.User.findOne({
        where: { email: req.query.email }
      });
      const unverifiedId = existingUser.isVerified;
      if (unverifiedId === false) {
        existingUser.update({ isVerified: true });
        return Response.signupResponse(res, 200, `User with ${existingUser.email} has been verified`);
      }
      return Response.signupResponse(res, 202, `${existingUser.email} is already verified`);
    } catch (error) {
      return Response.errorResponse(res, 500, `${error.message}`);
    }
  }
}
