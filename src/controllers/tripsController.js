import uuid from 'uuid/v4';
import db from '../models';
import Response from '../utils/ResponseHandler';
import TripsService from '../services/tripServices';
import stringHelper from '../utils/stringHelper';

/**
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
      const { user } = req;
      const {
        location, destination, reason, departureDate, gender, role, passportName
      } = req.body;
      const { email } = req.payload;
      const requestExist = await db.Request.findOne({
        where: {
          departureDate,
          email
        },
      });
      if (requestExist) {
        return Response.errorResponse(res, 409, res.__('Request already exist'));
      }
      const newRequest = await db.Request.create({
        id: uuid(),
        type: 'one way',
        managerId: user.managerId,
        location,
        destination,
        reason,
        departureDate,
        email,
        profileData: [{
          gender,
          passportName,
          role
        }],
      });
      return Response.success(res, 201, res.__('Request created successfully'), newRequest);
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
    try {
      const { user } = req;
      const {
        location,
        destination,
        departureDate,
        returnDate,
        reason,
        gender, role, passportName
      } = req.body;
      if (Date.parse(departureDate) >= Date.parse(returnDate)) {
        return Response.errorResponse(res, 400, res.__('the return date must be greater than departure date'));
      }
      const request = await db.Request.findOne({
        where: {
          email: user.email,
          departureDate
        }
      });
      if (request) return Response.errorResponse(res, 400, res.__('request with the same departure date exist'));
      const newRequest = await db.Request.create({
        id: uuid(),
        type: 'two way',
        managerId: user.managerId,
        email: user.email,
        userId: user.id,
        location: location.toLowerCase().trim(),
        destination: destination.toLowerCase().trim(),
        departureDate,
        returnDate,
        reason: reason.trim(),
        profileData: [{
          gender: gender.toLowerCase().trim(),
          passportName: passportName.toLowerCase().trim(),
          role: role.toLowerCase().trim()
        }],
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
        id, location, destination, departureDate, returnDate, reason,
        gender, role, passportName
      } = req.body;
      const existingRequest = await db.Request.findOne({ where: { id } });
      if (!existingRequest || existingRequest.status === 'approved' || existingRequest.status === 'rejected') {
        return Response.errorResponse(res, 404, res.__('The request does not exist or it\'s either been approved or rejected'));
      }
      if (existingRequest.email !== user.email || null) {
        return Response.errorResponse(res, 401, res.__('Only the requester of this trip can edit the trip.'));
      }
      const updatedRequest = await db.Request.update({
        location: location.toLowerCase().trim(),
        destination: destination.toLowerCase().trim(),
        departureDate,
        returnDate,
        reason: reason.trim(),
        profileData: [{
          gender: gender.toLowerCase().trim(),
          passportName: passportName.toLowerCase().trim(),
          role
        }],
      }, { where: { id } });
      return Response.success(res, 200, res.__('Request updated successfully'), updatedRequest);
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} avail trip request
   */
  static async availTripRequests(req, res) {
    try {
      const { user } = req;
      const availableRequests = await db.Request.findAll({ where: { managerId: user.id, status: 'open' } });
      if (availableRequests.length === 0) {
        return Response.success(res, 200, res.__('No trip requests available'));
      }
      return Response.success(res, 200, res.__('Pending requests to approve'), availableRequests);
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }

  /**
     * @description Create multi city request method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} request
     * @memberof requestController
     */
  static async createMultiCityRequest(req, res) {
    try {
      const { user } = req;
      const {
        location, destination, reason, departureDate, stops, returnDate,
        gender, role, passportName
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
      if (stops.length <= 0) {
        return Response.errorResponse(res, 400, res.__('Please provide your stops'));
      }
      if (Date.parse(departureDate) >= Date.parse(stops[0].stopArrivalDate)) {
        return Response.errorResponse(res, 400, res.__(`the arrival to ${stops[0].stopName} date must be greater than your trip departure date`));
      }
      let i;
      for (i = 0; i < stops.length; i += 1) {
        if (i < (stops.length - 1) && stops[i].stopDepartureDate > stops[i + 1].stopArrivalDate) {
          return Response.errorResponse(res, 400, res.__('Check your STOPS arrival and depature dates'));
        }
        if (stops[i].stopArrivalDate > stops[i].stopDepartureDate) {
          return Response.errorResponse(res, 400, res.__(`your departureDate at ${stops[i].stopName} has to be greater than arrival Date`));
        }
        if (Date.parse(stops[i].stopDepartureDate) >= Date.parse(returnDate)) {
          return Response.errorResponse(res, 400, res.__('Please enter valid return date according to your stops and actual departure date'));
        }
      }
      const newMulticityRequest = await db.Request.create({
        id: uuid(),
        userId: user.id,
        type: 'multi city',
        location: location.toLowerCase(),
        destination: destination.toLowerCase(),
        reason: reason.trim(),
        departureDate,
        email,
        stops,
        returnDate,
        managerId: user.managerId,
        profileData: [{
          gender: gender.toLowerCase().trim(),
          passportName: passportName.toLowerCase().trim(),
          role
        }],
      });
      return Response.success(res, 201, res.__('Multi city request created successfully'), newMulticityRequest);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} confirmed request
   */
  static async confirmRequest(req, res) {
    const { user } = req;
    const { requestId } = req.params;
    try {
      const request = await db.Request.findOne({
        where: {
          id: requestId
        }
      });
      if (!request) {
        return Response.errorResponse(res, 404, res.__('request not found'));
      }
      if (request.managerId !== user.id) {
        return Response.errorResponse(res, 401, res.__('you are not the assigned manager for this user'));
      }
      if (request.status === 'open') {
        return Response.errorResponse(res, 400, res.__('the request you are trying to confirm is still open'));
      }
      if (request.confirm === true) {
        return Response.errorResponse(res, 400, res.__('the request is already re-confirmed'));
      }
      const updatedRequest = await request.update({ confirm: true });
      return Response.success(res, 200, res.__('request re-confirmed'), updatedRequest);
    } catch (err) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @return {object} reject request
   */
  static async rejectRequest(req, res) {
    try {
      const { user } = req;
      const { requestId } = req.params;

      const findRequest = await db.Request.findOne({
        where: { id: requestId },
      });
      if (!findRequest) {
        return Response.errorResponse(res, 404, 'Request not found');
      }
      if (findRequest.managerId !== user.id) {
        return Response.success(res, 401, res.__('This request is not yours it is for another manager'));
      }
      if (findRequest.status === 'rejected') {
        return Response.success(res, 200, res.__('Request has been already rejected'));
      }
      await db.Request.update({
        status: 'rejected'
      }, {
        where: {
          id: requestId,
          managerId: user.id
        }
      });
      return Response.success(res, 200, res.__('Request rejected successfully'));
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }

  /**
     * @description request feature
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} array of request
     * @memberof requestController
     */
  static async requestSearch(req, res) {
    try {
      const { user } = req;
      const {
        id, location, destination, status, reason, departureDate, returnDate
      } = req.query;
      const field = {
        id,
        location,
        destination,
        status,
        reason,
        departureDate,
        returnDate
      };
      const requests = await TripsService.searchRequest(field, user);
      if (requests === stringHelper.requestNotFound) {
        return Response.errorResponse(res, 404, res.__(requests));
      }
      return Response.success(res, 200, res.__('requests found'), requests);
    } catch (err) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} approve request
   */
  static async approveRequest(req, res) {
    const { requestId } = req.params;
    const { user } = req;
    try {
      const approvedRequest = await TripsService.approveRequest(requestId, user.id);
      if (approvedRequest === stringHelper.approveRequestNotFound) {
        return Response.errorResponse(res, 404, res.__(approvedRequest));
      }
      return Response.success(res, 200, res.__('request approved'), approvedRequest);
    } catch (err) {
      return Response.errorResponse(res, 200, res.__('server error'));
    }
  }
}
