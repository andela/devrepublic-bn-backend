import db from '../models';
import Response from '../utils/ResponseHandler';

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
      const newComment = await db.Comments.create({
        requestId,
        commmentOwner: user.id,
        comment,
      });
      return Response.success(res, 200, res.__('Comment is successfully posted'), newComment);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }
}
