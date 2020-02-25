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

/**
 * @swagger
 * definitions:
 *   return trip:
 *     type: object
 *     properties:
 *       location:
 *         type: string
 *       destination:
 *         type: string
 *       departureDate:
 *         type: string
 *       returnDate:
 *         type: string
 *       reason:
 *         type: string
 *       accomodation:
 *         type: string
 *       required:
 *         - location
 *         - destination
 *         - departureDate
 *         - returnDate
 *         - reason
 *         - accomodation
 */
/**
* @swagger
* /api/v1/trips/return:
*   post:
*     tags:
*       - Trips
*     name: Request a return trip
*     summary: request a trip where you specifie a return date
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             location:
*               type: string
*             destination:
*               type: string
*             departureDate:
*               type: string
*             returnDate:
*               type: string
*             reason:
*               type: string
*             accomodation:
*               type: string
*         required:
*           - location
*           - destination
*           - departureDate
*           - returnDate
*           - reason
*           - accomodation
*     responses:
*       '201':
*             description: Request created successfully.
* */

/**
 * @swagger
 * definitions:
 *   edit trip:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       location:
 *         type: string
 *       destination:
 *         type: string
 *       departureDate:
 *         type: string
 *       returnDate:
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
* /api/v1/trips/edit:
*   patch:
*     tags:
*       - Trips
*     name: Edit a trip
*     summary: Requester should be able to edit their request
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             id:
*               type: string
*             location:
*               type: string
*             destination:
*               type: string
*             departureDate:
*               type: string
*             returnDate:
*               type: string
*             reason:
*               type: string
*             accomodation:
*               type: string
*         required:
*           - location
*           - destination
*           - departureDate
*           - returnDate
*           - reason
*           - accomodation
*     responses:
*       '200':
*             description: Request update successfully.
*       '404':
*             description: The request does not exist or it's either been approved or rejected
*       '401':
*             description: Only the requester of this trip can edit the trip.
* */
