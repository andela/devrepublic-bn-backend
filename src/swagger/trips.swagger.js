/**
 * @swagger
 * definitions:
 *   one-way:
 *     type: object
 *     properties:
 *       location:
 *         type: string
 *       destination:
 *         type: string
 *       departureDate:
 *         type: string
 *       reason:
 *         type: string
 *       accomodation:
 *         type: string
 *       required:
 *         - location
 *         - destination
 *         - departureDate
 *         - reason
 *         - accomodation
 */

/**
 * @swagger
 * /api/v1/trips/one-way:
 *   post:
 *     tags:
 *       - Request Trip
 *     name: requestTrip
 *     summary: user can request a trip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/one-way'
 *           type: object
 *           properties:
 *             location:
 *               type: string
 *             destination:
 *               type: string
 *             departureDate:
 *               type: string
 *             reason:
 *               type: string
 *             accomodation:
 *               type: string
 *         required:
 *           - location
 *           - destination
 *           - departureDate
 *           - reason
 *           - accomodation
 *     responses:
 *           '200':
 *               description: Request created successfully.
 *           '401':
 *               description: Unauthorized.
 *           '409':
 *               description: Request already exist.
 * */
