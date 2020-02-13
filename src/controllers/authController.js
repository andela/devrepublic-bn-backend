import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models';
import provideToken from '../utils/provideToken';
import Response from '../utils/ResponseHandler';


dotenv.config();
/**
 *
 * @description Authentication Controller
 * @class AuthController
 */
export default class AuthController {
  /**
     * @description Sign up method
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} User
     * @memberof authController
     */
  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const existingUser = await db.User.findOne({
        where: { email }
      });

      if (existingUser) {
        return Response.errorResponse(res, 409, 'Email already exists');
      }
      const hashedPassword = bcrypt.hashSync(password, Number(process.env.passwordHashSalt));
      const user = await db.User.create({
        id: uuid(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      const token = provideToken(user.id, email);
      return Response.signupResponse(res, 201, 'User successfully registered', token);
    } catch (error) {
      return Response.errorResponse(res, 500, `${error.message}`);
    }
  }
}
