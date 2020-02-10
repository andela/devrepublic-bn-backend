import db from '../models';
import ResponceHandler from './ResponseHandler';
/**
 *
 *
 * @export
 * @class DatabaseSearch
 */
class DatabaseSearch {
/**
 *
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} object
 * @memberof DatabaseSearch
 */
  static async finduser(req, res, next) {
    const { email } = req.body;
    const existingUser = await db.User.findOne({
      where: { email }
    });

    if (existingUser) {
      return ResponceHandler.errorResponse(res, 409, 'Email already exists');
    }
    req.userDetails = existingUser;
    next();
  }
}
export default DatabaseSearch;
