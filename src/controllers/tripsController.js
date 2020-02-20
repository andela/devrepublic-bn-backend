import uuid from 'uuid/v4';
import db from '../models';
import Response from '../utils/ResponseHandler';

/**
 *
 * @description RequestController Controller
 * @class RequestController
 */
export default class requestController {
  /**
     * @description Create request method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} request
     * @memberof requestController
     */
  static async createRequest(req, res) {
    try {
      const {
        location, destination, reason, accomodation, departureDate
      } = req.body;
      const { email } = req.payload;
      const requestExist = await db.Request.findOne({
        where: {
          departureDate,
          email
        },
      });
      if (requestExist) {
        return Response.errorResponse(res, 409, 'Request already exist');
      }
      const facility = await db.Facilities.findOne({
        where: {
          id: accomodation,
          location: destination
        }
      });
      if (!facility) {
        return Response.errorResponse(res, 404, res.__('the accomodation doesn\'t exist or it\'s not in your destination'));
      }
      const newRequest = await db.Request.create({
        id: uuid(),
        location,
        destination,
        reason,
        accomodation,
        departureDate,
        email,
        status: 'Open'
      });
      return Response.success(res, 201, 'Request created successfully', newRequest);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }
}
