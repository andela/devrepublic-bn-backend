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
 *       - name: remember
 *         in: query
 *         schema:
 *           type: string
 *           example: false
 *       - name: token
 *         in: header
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
 *             reason:
 *               type: string
 *             accomodation:
 *               type: string
 *             gender:
 *               type: string
 *               example: ""
 *             passportName:
 *               type: string
 *               example: ""
 *             role:
 *               type: string
 *               example: ""
 *         required:
 *           - location
 *           - destination
 *           - departureDate
 *           - reason
 *           - accomodation
 *           - gender
 *           - passportName
 *           - role
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
*       - name: remember
*         in: query
*         schema:
*           type: string
*           example: false
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
*             gender:
*               type: string
*               example: ""
*             passportName:
*               type: string
*               example: ""
*             role:
*               type: string
*               example: ""
*         required:
*           - location
*           - destination
*           - departureDate
*           - returnDate
*           - reason
*           - accomodation
*           - gender
*           - passportName
*           - role
*     responses:
*       '201':
*             description: Request created successfully.
*       '401':
*             description: Unauthorized.
*       '409':
*             description: Request already exist.
* */
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
*       - name: remember
*         in: query
*         schema:
*           type: string
*           example: false
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
*             gender:
*               type: string
*               example: ""
*             passportName:
*               type: string
*               example: ""
*             role:
*               type: string
*               example: ""
*         required:
*           - location
*           - destination
*           - departureDate
*           - returnDate
*           - reason
*           - accomodation
*           - gender
*           - passportName
*           - role
*     responses:
*       '200':
*             description: Request update successfully.
*       '404':
*             description: The request does not exist or it's either been approved or rejected
*       '401':
*             description: Only the requester of this trip can edit the trip.
* */
/**
 * @swagger
 * definitions:
 *   Multi city trip:
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
 *         - stops
 */

/**
* @swagger
* /api/v1/trips/multi-city:
*   post:
*     tags:
*       - Trips
*     name: Request a multi city trip
*     summary: request a trip where you specifie different stops during that trip
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
*             stops:
*               type: array
*               items:
*                 type: object
*         required:
*           - location
*           - destination
*           - departureDate
*           - returnDate
*           - reason
*           - accomodation
*           - stops
*     responses:
*       '201':
*             description: Multi city request created successfully.
*       '400':
*             description: Please double checks your departure and arrival dates.
* */

/**
 * @swagger
 * /api/v1/trips/view:
 *   get:
 *     tags:
 *       - Trips
 *     name: Manager view trip requests
 *     summary:  Manager should be able to view all open requests they have to approve
 *     parameters:
 *       - name: token
 *         in: header
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Pending request to approve.
 *       '401':
 *         description: You are not authorized to perform this action
 */
