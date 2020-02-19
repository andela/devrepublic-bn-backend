import dotenv from 'dotenv';
import { provideToken } from '../utils/tokenHandler';
import sendMsg from '../utils/sendEmail';
import Models from '../models';

dotenv.config();
const { User } = Models;
/**
 * @class AuthService
 * @description this class handles user services
 */
export default class AuthService {
  /**
   * set the user token and send the email(servicee)
   * @param  {object} user
   * @param  {object} content
   * @returns {object} send resent password Email function
   */
  static async forgotPassword(user, content) {
    const token = provideToken(user.id, user.isVerified);
    const link = `http://${process.env.BASE_URL}/api/v1/auth/resetPassword?token=${token}`;
    return sendMsg(user.email, user.firstName, content, link);
  }

  /**
   * reset user password
   * @param  {string} id
   * @param  {string} password
   * @returns  {object} user
   */
  static async resetPassword(id, password) {
    await User.update({ password }, {
      where: {
        id
      }
    });
  }
}
