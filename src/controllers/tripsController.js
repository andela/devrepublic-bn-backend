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

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} request
   */
  static async createReturnRequest(req, res) {
    const { user } = req;
    const {
      location, destination, departureDate, returnDate, reason, accomodation
    } = req.body;
    if (Date.parse(departureDate) > Date.parse(returnDate)) {
      return Response.errorResponse(res, 400, res.__('the return date must be greater than departure date'));
    }
    try {
      const request = await db.Request.findOne({
        where: {
          email: user.email,
          departureDate
        }
      });
      if (request) return Response.errorResponse(res, 400, res.__('request with the same departure date exist'));
      const facility = await db.Facilities.findOne({
        where: {
          id: accomodation,
          location: destination
        }
      });
      if (!facility) {
        return Response.errorResponse(res, 404, res.__('the accomondation doesn\'t exist or it\'s not in your destination'));
      }
      const newRequest = await db.Request.create({
        id: uuid(),
        email: user.email,
        location,
        destination,
        departureDate,
        returnDate,
        reason,
        accomodation,
        status: 'open'
      });
      return Response.success(res, 201, res.__('Request created successfully'), newRequest);
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} edited request
   */
  static async editRequest(req, res) {
    try {
      const { user } = req;
      const {
        id, location, destination, departureDate, returnDate, reason, accomodation
      } = req.body;
      const existingRequest = await db.Request.findOne({ where: { id } });
      if (!existingRequest || existingRequest.status === 'Approved' || existingRequest.status === 'Rejected') {
        return Response.errorResponse(res, 404, res.__('The request does not exist or it\'s either been approved or rejected'));
      }
      if (existingRequest.email !== user.email || null) {
        return Response.errorResponse(res, 401, res.__('Only the requester of this trip can edit the trip.'));
      }
      const updatedRequest = await db.Request.update({
        location, destination, departureDate, returnDate, reason, accomodation
      }, { where: { id } });
      return Response.success(res, 200, res.__('Request updated successfully'), updatedRequest);
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }
}
