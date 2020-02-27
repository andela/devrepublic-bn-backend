import uuid from 'uuid';
import db from '../models';
import Response from '../utils/ResponseHandler';
import uploadImage from '../services/uploadImageService';

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
     * @memberof uFacilitiesController
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
    * @description create facility method
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
}
export default FacilitiesController;
