import uuid from 'uuid/v4';
import db from '../models';
import Response from '../utils/ResponseHandler';
import findFacilityHandlder from '../utils/findFacility';
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
      const { user } = req;
      const {
        location, destination, reason, accomodation, departureDate, gender, role, passportName
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
      const output = findFacilityHandlder(accomodation, destination, res);
      if (output) {
        const newRequest = await db.Request.create({
          id: uuid(),
          type: 'one way',
          managerId: user.managerId,
          location,
          destination,
          reason,
          accomodation,
          departureDate,
          email,
          profileData: [{
            gender,
            passportName,
            role
          }],
          status: 'Open'
        });
        return Response.success(res, 201, 'Request created successfully', newRequest);
      }
    } catch (error) {
      // console.log(error);
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
      location,
      destination,
      departureDate,
      returnDate,
      reason,
      accomodation,
      gender, role, passportName
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
      const facility = await findFacilityHandlder(accomodation, destination);
      if (!facility) {
        return Response.errorResponse(res, 404, res.__('the accomondation doesn\'t exist or it\'s not in your destination'));
      }
      const newRequest = await db.Request.create({
        id: uuid(),
        type: 'two way',
        managerId: user.managerId,
        email: user.email,
        location,
        destination,
        departureDate,
        returnDate,
        reason,
        accomodation,
        profileData: [{
          gender,
          passportName,
          role
        }],
        status: 'Open'
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
        id, location, destination, departureDate, returnDate, reason, accomodation,
        gender, role, passportName
      } = req.body;
      const existingRequest = await db.Request.findOne({ where: { id } });
      if (!existingRequest || existingRequest.status === 'Approved' || existingRequest.status === 'Rejected') {
        return Response.errorResponse(res, 404, res.__('The request does not exist or it\'s either been approved or rejected'));
      }
      if (existingRequest.email !== user.email || null) {
        return Response.errorResponse(res, 401, res.__('Only the requester of this trip can edit the trip.'));
      }
      const updatedRequest = await db.Request.update({
        location,
        destination,
        departureDate,
        returnDate,
        reason,
        accomodation,
        profileData: [{
          gender,
          passportName,
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
      const availableRequests = await db.Request.findAll({ where: { managerId: user.id, status: 'Open' } });
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
        location, destination, reason, accomodation, departureDate, stops, returnDate
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
      const facility = findFacilityHandlder(accomodation, destination);
      if (!facility) {
        return Response.errorResponse(res, 404, res.__('the accomondation doesn\'t exist or it\'s not in your destination'));
      }
      if (stops.length <= 0) {
        return Response.errorResponse(res, 400, res.__('Please provide your stops'));
      }
      if (Date.parse(departureDate) > Date.parse(stops[0].stopArrivalDate)) {
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
        if (Date.parse(stops[i].stopDepartureDate) > Date.parse(returnDate)) {
          return Response.errorResponse(res, 400, res.__('Please enter valid return date according to your stops and actual departure date'));
        }
      }
      const newMulticityRequest = await db.Request.create({
        id: uuid(),
        type: 'multi city',
        managerId: user.id,
        location,
        destination,
        reason,
        accomodation,
        departureDate,
        email,
        status: 'Open',
        stops,
        returnDate
      });
      return Response.success(res, 201, res.__('Multi city request created successfully'), newMulticityRequest);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }
}
