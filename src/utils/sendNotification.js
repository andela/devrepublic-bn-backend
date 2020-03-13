import { connectedUsers } from '../middlewares/io';
import Response from './ResponseHandler';
import db from '../models';
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
      const { user } = req;
      try {
        if (connectedUsers[notification.receiverId]) {
          connectedUsers[notification.receiverId].forEach(async (el) => {
            await req.io.to(el).emit('notification', JSON.stringify(notification));
          });
        }
        const userInfo = await db.User.findOne({ where: { id: user.id } });

        if (userInfo.emailNotifications) {
          sendMsg(notification.receiverEmail, '', content, notification.link);
        }
      } catch (error) {
        return Response.errorResponse(req, 500, error.message);
      }
      sendMsg(notification.receiverEmail, '', content, notification.link);
    }
  }
}
