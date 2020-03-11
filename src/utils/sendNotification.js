import { connectedUsers } from '../middlewares/io';
import sendMsg from './sendEmail';

/**
 *
 * @description send notification class
 * @class SendNotification
 */
export default class SendNotification {
  /**
   * @param {object} notification
   * @param {object} req
   * @param {object} content
   * @return {object} return the io object
   */
  static async sendNotif(notification, req, content) {
    if (connectedUsers[notification.receiverId]) {
      connectedUsers[notification.receiverId].forEach(async (el) => {
        await req.io.to(el).emit('notification', JSON.stringify(notification));
      });
    }
    await sendMsg(notification.receiverEmail, '', content, notification.link);
  }
}
