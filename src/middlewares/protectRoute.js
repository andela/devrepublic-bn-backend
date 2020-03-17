import localStorage from 'localStorage';
import db from '../models';
import Response from '../utils/ResponseHandler';
import { verifyToken } from '../utils/tokenHandler';

/**
 * @description protect route class
 * @class protectRoutes
 */
export default class protectRoutes {
  /** @description validate if user is signup
   * @static
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} next
   * @memberof protectRoutes
   */
  static async verifyUser(req, res, next) {
    try {
      const { token } = req.headers;

      if (!token) {
        return Response.errorResponse(res, 401, res.__('No token provided'));
      }
      const payload = verifyToken(token);
      const user = await db.User.findOne({
        where: {
          id: payload.id
        }
      });
      if (!user) {
        return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
      }
      req.payload = payload;
      req.user = user;
      return next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return Response.errorResponse(res, 400, res.__('token must be provided and valid'));
      }
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @description verify if user is a requester
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static verifyRequester(req, res, next) {
    const { user } = req;
    if (user.role !== 'requester') return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
    next();
  }

  /**
   * @description verify if user is a travel adminstrator or a supplier;
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static verifyTripAdminOrSupplier(req, res, next) {
    const { user } = req;
    if (user.role !== 'travel administrator' && user.role !== 'supplier') {
      return Response.errorResponse(res, 401, res.__('you have to be a travel admin or a supplier to perform this action'));
    }
    next();
  }

  /**
   * @description verify if user is a Manager
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static verifyManager(req, res, next) {
    const { user } = req;
    if (user.role !== 'manager') {
      return Response.errorResponse(res, 401, res.__('you are not authorised for this operation'));
    }
    next();
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static checkUserManager(req, res, next) {
    const { user } = req;
    if (user.managerId === null) {
      return Response.errorResponse(res, 401, res.__('user should have manager before performing this operation'));
    }
    next();
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async verifyFacility(req, res, next) {
    const { id } = req.query;
    const existingFacility = await db.Facilities.findOne({ where: { id } });
    if (!existingFacility) {
      return Response.errorResponse(res, 401, res.__('facility with this id does not exist'));
    }
    next();
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async checkIfLiked(req, res, next) {
    const { user } = req;
    const { id } = req.query;
    const likeFacility = await db.Facilities.findOne({ where: { id } });
    const { likesId } = likeFacility;
    const alreadyLiked = likesId.find((d) => d === user.id);
    if (alreadyLiked) {
      return Response.errorResponse(res, 403, res.__('user has already liked facility'));
    }
    next();
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async checkIfUnliked(req, res, next) {
    const { user } = req;
    const { id } = req.query;
    const unlikedFacility = await db.Facilities.findOne({ where: { id } });
    const { unlikesId } = unlikedFacility;
    const alreadyUnliked = unlikesId.find((u) => u === user.id);
    if (alreadyUnliked) {
      return Response.errorResponse(res, 403, res.__('user has already unliked facility'));
    }
    next();
  }

  /**
  * @description check if request exists
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} user
   */
  static async checkRequestDetails(req, res, next) {
    const { requestId } = req.params;
    const { user } = req;
    const requestExist = await db.Request.findOne({
      where: { id: requestId },
    });

    if (!requestExist) {
      return Response.errorResponse(res, 404, res.__('Request not found'));
    }
    const managerDetails = await db.User.findOne({
      where: { id: requestExist.managerId },
    });
    if (user.email !== requestExist.email && user.id !== requestExist.managerId) {
      return Response.success(res, 401, res.__('This request has been a created by another user and belongs to another manager'));
    }
    req.request = requestExist;
    req.managerDetails = managerDetails;
    next();
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async checkUnreadNotifications(req, res, next) {
    const { user } = req;
    const unreadUsersNotifications = await db.Notifications.findAll({
      where: { receiverId: user.id, status: 'unread' }
    });

    if (unreadUsersNotifications.length === 0) {
      return Response.errorResponse(res, 404, res.__('no unread notifications'));
    }
    next();
  }
}
