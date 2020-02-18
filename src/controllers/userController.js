import db from '../models';
import Response from '../utils/ResponseHandler';

/**
 * @description User Controller
 * @class UserController
 */
export default class UserController {
  /**
     * @description login method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} User
     * @memberof authController
     */
  static async setRoles(req, res) {
    try {
      const { email, role } = req.body;
      const admin = req.payload;
      const avaiableAdmins = await db.User.findAll({
        where: { role: 'super administrator' }
      });
      if (admin.role !== 'super administrator' || (avaiableAdmins.length === 2 && role === 'super administrator')) {
        return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
      }
      const existingUser = await db.User.findOne({
        where: { email }
      });
      if (!existingUser) {
        return Response.errorResponse(res, 404, res.__('The user doesn\'t exist'));
      }
      if (existingUser.role === role) {
        return Response.errorResponse(res, 409, res.__('The user is already a %s', role));
      }

      await db.User.update({ role }, { where: { email }, attributes: ['email', 'role'] });
      return Response.success(res, 200, res.__('User roles updated successfully'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__(error.message));
    }
  }
}
