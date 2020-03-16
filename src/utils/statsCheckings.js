import Response from './ResponseHandler';
/**
 *
 * @description view stats class
 * @class StatsController
 */
export default class StatsController {
  /**
   * @param {object} allTrips
   * @param {object} res
   * @return {object} return stats
   */
  static async stats(allTrips, res) {
    const createdTrips = allTrips.length;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let previousMonths, openRequests, approvedRequests, rejectedRequets, upCommingTrips, pastYears;
    const previousMonthsArr = [], upCommingTripsArray = [],
      pastYearsArray = [], openRequestArr = [],
      approvedRequestArr = [], rejectedRequetsArr = [];
    allTrips.forEach(element => {
      switch (element.status) {
        case 'open':
          openRequestArr.push(element);
          openRequests = openRequestArr.length;
          break;
        case 'approved':
          approvedRequestArr.push(element);
          approvedRequests = approvedRequestArr.length;
          break;
        case 'rejected':
          rejectedRequetsArr.push(element);
          rejectedRequets = rejectedRequetsArr.length;
          break;
        default:
      }
      if (new Date(element.departureDate).getFullYear() === currentYear) {
        if (new Date(element.departureDate).getMonth() < currentMonth) {
          previousMonthsArr.push(element);
          previousMonths = previousMonthsArr.length;
        } else {
          upCommingTripsArray.push(element);
          upCommingTrips = upCommingTripsArray.length;
        }
      }
      if (new Date(element.departureDate).getFullYear() < currentYear) {
        pastYearsArray.push(element);
        pastYears = pastYearsArray.length;
      }
    });
    return Response.success(res, 200, res.__('Trips statistics'), {
      totalTripsNumber: createdTrips,
      upCommingTrips,
      previousMonths,
      pastYears,
      statusStatistics: { openRequests, approvedRequests, rejectedRequets }
    });
  }
}
