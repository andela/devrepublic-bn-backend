import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import db from '../models';
import Response from '../utils/ResponseHandler';
import uploadImage from '../services/uploadImageService';
import findFacilityByLocation from '../utils/findFacility';
import FacilityService from '../services/facilityService';
import stringHelper from '../utils/stringHelper';
/**
 * @description Facilities Controller
 * @class FacilitiesController
 */
class FacilitiesController {
  /**
     * @description create facility method
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Facility
     * @memberof FacilitiesController
    */
  static async createFacility(req, res) {
    try {
      const {
        facilityName, location, amenities, services
      } = req.body;
      const { user } = req;
      if (!req.file) {
        return Response.errorResponse(res, 400, res.__('Choose an a picture first'));
      }
      const image = req.file;
      const output = await uploadImage(image, req);
      const facility = await db.Facilities.findOne({
        where: {
          facilityName: facilityName.toLowerCase(),
          location: location.toLowerCase()
        }
      });
      if (facility) {
        return Response.errorResponse(res, 400, res.__('facility already created'));
      }
      const newFacility = await db.Facilities.create({
        id: uuid(),
        facilityName: facilityName.toLowerCase().trim(),
        location: location.toLowerCase().trim(),
        image: output,
        amenities: amenities.trim(),
        services: services.trim(),
        createdBy: user.id
      });
      return Response.success(res, 201, res.__('Facility created successfully'), newFacility);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
    * @description create room method
    * @static
    * @param {Object} req
    * @param {Object} res
    * @returns {Object} Room
    * @memberof FacilitiesController
  */
  static async createRoom(req, res) {
    try {
      const { facilityId, roomName, type } = req.body;
      const existingFacility = await db.Facilities.findOne({ where: { id: facilityId } });
      if (!existingFacility) {
        return Response.errorResponse(res, 401, res.__('This facility does not exist'));
      }
      const room = await db.Rooms.create({
        id: uuid(),
        facilityId,
        roomName: roomName.toLowerCase().trim(),
        type: type.toLowerCase().trim()
      });
      await db.Facilities.increment('numOfRooms', {
        where: {
          id: facilityId
        }
      });
      return Response.success(res, 201, res.__('Room created successfully'), room);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
    * @description like a facility method
    * @static
    * @param {Object} req
    * @param {Object} res
    * @returns {Object} Room
    * @memberof FacilitiesController
  */
  static async likeFacility(req, res) {
    try {
      const { user } = req;
      const { id } = req.query;

      await db.Facilities.increment('likes', { where: { id } });
      await db.Facilities.update({
        likesId: Sequelize.fn('array_append', Sequelize.col('likesId'), user.id)
      }, { where: { id } });
      return Response.success(res, 200, res.__('user has liked facility'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
    * @description unlike a facility method
    * @static
    * @param {Object} req
    * @param {Object} res
    * @returns {Object} Room
    * @memberof FacilitiesController
  */
  static async unlikeFacility(req, res) {
    try {
      const { user } = req;
      const { id } = req.query;

      await db.Facilities.increment('unlikes', { where: { id } });
      await db.Facilities.update({
        unlikesId: Sequelize.fn('array_append', Sequelize.col('unlikesId'), user.id)
      }, { where: { id } });
      return Response.success(res, 200, res.__('user has unliked facility'));
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
* @description book facility method
* @static
* @param {Object} req
* @param {Object} res
* @returns {Object} Facility Booking
* @memberof FacilitiesController
*/
  static async bookFacility(req, res) {
    try {
      const {
        checkin, checkout, roomId, facilityId, requestId
      } = req.body;
      const { user } = req;
      if (Date.parse(checkin) >= Date.parse(checkout)) {
        return Response.errorResponse(res, 400, res.__('the checkout date must be greater than checkin date'));
      }

      const request = await db.Request.findOne({
        where: {
          id: requestId,
          email: user.email
        }
      });
      if (!request) return Response.errorResponse(res, 401, res.__('request does not exist or is not yours'));

      const room = await db.Rooms.findOne({
        where: {
          facilityId,
          id: roomId,
          availability: true
        }
      });
      if (!room) {
        return Response.errorResponse(res, 404, res.__('this room is booked or it does not exist'));
      }
      const facility = await findFacilityByLocation(facilityId, request.dataValues.destination);
      if (!facility) {
        return Response.errorResponse(res, 404, res.__('facility does not exist or is not in that location'));
      }

      const newBooking = await db.Bookings.create({
        id: uuid(),
        facilityId,
        roomId,
        requestId,
        bookedBy: user.email,
        checkin,
        checkout
      });

      await db.Rooms.update({ availability: false }, {
        where: {
          facilityId,
          id: roomId,
        }
      });
      return Response.success(res, 201, res.__('Booking created successfully'), newBooking);
    } catch (error) {
      return Response.errorResponse(res, 500, res.__('server error'));
    }
  }

  /**
  * @description rate facility method
  * @static
  * @param {Object} req
  * @param {Object} res
  * @returns {Object} Facility with ratings
  * @memberof FacilitiesController
  */
  static async rateFacility(req, res) {
    const { user } = req;
    const { facilityId } = req.params;
    const { rating } = req.query;
    try {
      const result = await FacilityService.rateFacility(facilityId, user, rating);
      return ((result === stringHelper.facilityNotFound) && Response.errorResponse(res, 404, res.__(result))) || ((result === stringHelper.notVisitedFacility) && Response.errorResponse(res, 403, res.__(result))) || ((typeof result === 'object') && Response.success(res, 200, res.__('facility rated'), result));
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }

  /**
* @description give a facility feedback
* @static
* @param {Object} req
* @param {Object} res
* @returns {Object} Facility feedback
* @memberof FacilitiesController
*/
  static async facilityFeedback(req, res) {
    const { facilityId } = req.params;
    const { user } = req;
    const { feedback } = req.body;
    try {
      const result = await FacilityService.feedback(facilityId, user, feedback);
      return (((result === stringHelper.facilityNotFound) && Response.errorResponse(res, 404, req.__(result))) || ((result === stringHelper.notVisitedFacility) && Response.errorResponse(res, 403, req.__(result))) || (typeof result === 'object' && Response.success(res, 201, req.__('feedback saved successfully'), result)));
    } catch (err) {
      return Response.errorResponse(res, 500, err.message);
    }
  }
}
export default FacilitiesController;
