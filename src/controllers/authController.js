import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import localStorage from 'localStorage';
import db from '../models';
import sendMsg from '../utils/user-created-email';
import { provideToken } from '../utils/tokenHandler';
import Response from '../utils/ResponseHandler';

dotenv.config();

/**
 *
 * @description AuthController Controller
 * @class AuthController
 */
export default class AuthController {
  /**
     * @description Sign up method
     * @static
     * @param {Object} req`
     * @param {Object} res
     * @returns {Object} User
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
        return Response.errorResponse(res, 409, res.__('Email already exists'));
      }
      const hashedPassword = bcrypt.hashSync(password, Number(process.env.passwordHashSalt));
      const user = await db.User.create({
        id: uuid(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'requester'
      });
      const token = provideToken(user.id, user.isVerified, email, user.role);
      localStorage.setItem('token', token);
      sendMsg(email, token, firstName);
      return Response.signupResponse(res, 201, res.__('User is successfully registered'), token);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__(`${error.message}`));
    }
  }

  /**
     * @description login method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} User
     * @memberof AuthController
     */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({
        where: {
          email,
        },
        attributes: ['id', 'email', 'password', 'isVerified', 'role'],
      });
      if (!user) {
        return Response.errorResponse(res, 401, res.__('Incorrect email or password'));
      }
      if (bcrypt.compareSync(password, user.password)) {
        const { id, isVerified, role } = user.dataValues;
        const token = provideToken(id, isVerified, email, role);
        localStorage.setItem('token', token);
        return Response.login(res, 200, res.__('User is successfully logged in'), token);
      }
      return Response.errorResponse(res, 401, res.__('Incorrect email or password'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__(error.message));
    }
  }

  /**
     * @description logout method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} User
     * @memberof AuthController
     */
  static async logout(req, res) {
    localStorage.removeItem('token');
    return Response.login(res, 200, res.__('User is successfully logged out'));
  }
}
