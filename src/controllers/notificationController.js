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
  static async markAllNotificationsAsRead(req, res) {
    try {
      const { user } = req;
      await db.Notifications.update({ status: 'read' }, { where: { receiverId: user.id } });
      return Response.success(res, 200, res.__('all unread notifications marked as read'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} notification
   */
  static async optOutEmailNotifications(req, res) {
    try {
      const { user } = req;
      await db.User.update({ emailNotifications: false }, { where: { id: user.id } });
      return Response.success(res, 200, res.__('you have opted out of email notifications'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} notification
   */
  static async optInEmailNotifications(req, res) {
    try {
      const { user } = req;
      await db.User.update({ emailNotifications: true }, { where: { id: user.id } });
      return Response.success(res, 200, res.__('you have opted in for email notifications'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }
}
