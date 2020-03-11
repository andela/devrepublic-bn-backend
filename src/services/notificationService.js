import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import db from '../models';

dotenv.config();

/**
 * @class notificationService
 * @description this class handles Notifications services
 */
export default class Notifications {
  /**
   * @param  {String} receiverId
   * @param  {String} content
   * @return {Object} notification
   */
  static async createNotif(...[receiverId, receiverEmail, content, link]) {
    const newNotif = await db.Notifications.create({
      id: uuid(),
      receiverEmail,
      receiverId,
      content,
      link
    });
    return newNotif;
  }
}
