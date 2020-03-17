
/**
 *
 *
 * @export
 * @class ResponceHandler
 */
export default class ResponceHandler {
/**
 *
 *
 * @static
 * @param {Object} res
 * @param {Object} status
 * @param {String} message
 * @param {Object} token
 * @returns {Object} token
 * @memberof ResponceHandler
 */
  static signupResponse(res, status, message, token) {
    return (res.status(status).json({ status, message, token, }));
  }

  /**
 * @static
 * @param {Object} res
 * @param {Object} status
 * @param {String} error
 * @returns {Object} error
 * @memberof ResponceHandler
 */
  static errorResponse(res, status, error) {
    return (res.status(status).json({ status, error }));
  }

  /**
   * @param  {Object} res
   * @param  {Object} status
   * @param  {String} message
   * @param  {String} token
   * @returns {Object} as response
   * @param  {Object}} data
   */
  static login(res, status, message, token) {
    return (res.status(status).json({
      status,
      message,
      data: token
    }));
  }

  /**
   * @param  {Object} res
   * @param  {Object} status
   * @param  {String} message
   * @param  {Object} data
   * @returns {Object} as response
   * @param  {Object}} data
   */
  static success(...[res, status, message, data]) {
    return (res.status(status).json({
      status,
      message,
      data
    }));
  }
}
