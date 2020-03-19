import uuid from 'uuid/v4';
import db from '../models';
import Response from '../utils/ResponseHandler';
import notifService from '../services/notificationService';
import SendNotification from '../utils/sendNotification';

/**
 *
 * @description Comments Controller
 * @class CommentController
 */
export default class CommentController {
  /**
     * @description comment on a request method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} comment
     * @memberof CommentController
     */
  static async postComment(req, res) {
    try {
      const { user } = req;
      const { comment } = req.body;
      const { requestId } = req.params;
      const { email } = req.managerDetails;
      const newComment = await db.Comments.create({
        requestId,
        commentOwner: user.id,
        comment,
        id: uuid()
      });
      if (user.role === 'manager') {
        const notifyUser = await notifService.createNotif(req.request.userId, req.request.email, 'your manager posted a comment', '#');
        const content = {
          intro: req.__(notifyUser.content),
          instruction: req.__('Your Manager commented: %s', newComment.comment),
          text: req.__('View comment'),
          signature: req.__('signature')
        };
        await SendNotification.sendNotif(notifyUser, req, content);
      } else {
        const notifyUser = await notifService.createNotif(req.request.managerId, email, 'your requester posted a comment', '#');
        const content = {
          intro: req.__(notifyUser.content),
          instruction: req.__('Your requester commented: %s', newComment.comment),
          text: req.__('View comment'),
          signature: req.__('signature')
        };
        await SendNotification.sendNotif(notifyUser, req, content);
      }
      return Response.success(res, 200, res.__('Comment is successfully posted'), newComment);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} delete comment
   */
  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      await db.Comments.update({
        deleted: true
      }, {
        where: {
          id: commentId
        }
      });

      return Response.success(res, 200, res.__('Comment is successfully deleted'));
    } catch (err) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }
}
