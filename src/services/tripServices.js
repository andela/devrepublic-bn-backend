import { Sequelize } from 'sequelize';
import db from '../models';
import stringHelper from '../utils/stringHelper';

const { Op } = Sequelize;
/**
 * @class TripsService
 * @description this class handles trips services
 */
export default class TripsService {
  /**
   * search for a request
   * @param  {object} obj
   * @param  {object} user
   * @returns {object} request array
   */
  static async searchRequest(obj, user) {
    const searchObj = {};
    searchObj.where = {};
    let field = { ...obj };
    field = JSON.parse(JSON.stringify(field));
    const fieldArr = Object.keys(field);
    if (user.role === 'requester') {
      searchObj.where.email = user.email;
    }
    if (user.role === 'manager') {
      searchObj.where.managerId = user.id;
    }
    fieldArr.forEach((el) => {
      searchObj.where[el] = obj[el];
      if (el === 'location' || el === 'departure' || el === 'status' || el === 'accommodation' || el === 'reason' || el === 'destination') {
        searchObj.where[el] = { [Op.iLike]: `%${field[el].trim()}%` };
      }
    });
    const requests = await db.Request.findAll(searchObj);
    if (requests.length < 1) {
      return stringHelper.requestNotFound;
    }
    return requests;
  }

  /**
   * set the user token and send the email(servicee)
   * @param  {object} requestId
   * @param  {object} managerId
   * @returns {object} updated request
   */
  static async approveRequest(requestId, managerId) {
    const request = await db.Request.findOne({
      where: {
        id: requestId,
        managerId,
        status: 'open'
      }
    });
    if (!request) {
      return stringHelper.approveRequestNotFound;
    }
    const approvedRequest = await request.update({
      status: 'approved'
    }, {
      returning: true,
      plain: true
    });
    return approvedRequest;
  }
}
