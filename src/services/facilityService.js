import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import db from '../models';
import stringHelper from '../utils/stringHelper';

/**
 * @description facility services
 * @class FacilitiesService
 */
export default class FacilityService {
  /**
   * @param  {Object} facilityId
   * @param  {Object} user
   * @param  {Object} rating
   * @returns {Object} updatedFacility
   */
  static async rateFacility(facilityId, user, rating) {
    const todayDate = new Date();
    const facility = await db.Facilities.findOne({ where: { id: facilityId } });
    if (!facility) return stringHelper.facilityNotFound;
    const booking = await db.Bookings.findOne({
      where: {
        bookedBy: user.email,
        facilityId,
        checkin: {
          [Sequelize.Op.lte]: todayDate
        }
      }
    });
    if (!booking) return stringHelper.notVisitedFacility;
    const ratingUser = await db.Ratings.findOne({ where: { facilityId, userId: user.id } });
    if (!ratingUser) {
      await db.Ratings.create({
        id: uuid(),
        userId: user.id,
        facilityId,
        rating: rating * 1,
      });
      const sum = await db.Ratings.aggregate('rating', 'sum', { where: { facilityId } });
      const average = ((await db.Ratings.aggregate('rating', 'avg', { where: { facilityId }, dataType: 'float' })) * 1).toFixed(2);
      const updatedFacility = await facility.update({
        totalRating: sum, averageRating: average
      }, {
        returning: true, plain: true
      });
      return updatedFacility;
    }
    await ratingUser.update({ rating: rating * 1 }, { returning: true, plain: true });
    const sum = await db.Ratings.aggregate('rating', 'sum', { where: { facilityId } });
    const average = ((await db.Ratings.aggregate('rating', 'avg', { where: { facilityId }, dataType: 'float' })) * 1).toFixed(2);
    const updatedFacility = await facility.update({
      totalRating: sum, averageRating: average
    }, {
      returning: true, plain: true
    });
    return updatedFacility;
  }

  /**
   * @param  {Object} facilityId
   * @param  {Object} user
   * @param  {Object} feedback
   * @returns {Object} NewFeedback
   */
  static async feedback(facilityId, user, feedback) {
    const todayDate = new Date();
    const facility = await db.Facilities.findByPk(facilityId);
    if (!facility) {
      return stringHelper.facilityNotFound;
    }
    const booking = await db.Bookings.findOne({
      where: {
        bookedBy: user.email,
        facilityId,
        checkin: {
          [Sequelize.Op.lte]: todayDate
        }
      }
    });
    if (!booking) {
      return stringHelper.notVisitedFacility;
    }
    const newFeedback = await db.Feedback.create({
      id: uuid(),
      feedback,
      facilityId,
      userId: user.id
    });
    return newFeedback;
  }
}
