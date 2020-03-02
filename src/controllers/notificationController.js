import db from '../models';
import Response from '../utils/ResponseHandler';

/**
 * @description notification Controller
 * @class notificationController
 */
export default class notificationController {
/**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} notification
   */
  static async getAllNotifications(req, res) {
    const { user } = req;
    const notifications = await db.Notifications.findOne({
      where: {
        email: user.email
      }
    });
    const allNotifs = notifications.reverse();
    return Response(res, 200, 'success', allNotifs);
  }
}
