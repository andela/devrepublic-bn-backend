/**
 * @swagger
 * /api/v1/trips/one-way:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trips
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
*     security:
*       - bearerAuth: []
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
 *       required:
 *         - location
 *         - destination
 *         - departureDate
 *         - reason
 */

/**
* @swagger
* /api/v1/trips/edit:
*   patch:
*     security:
*       - bearerAuth: []
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
*/

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
 *       required:
 *         - location
 *         - destination
 *         - departureDate
 *         - returnDate
 *         - reason
 *         - stops
 */

/**
* @swagger
* /api/v1/trips/multi-city:
*   post:
*     security:
*       - bearerAuth: []
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
*             gender:
*               type: string
*               example: ""
*             passportName:
*               type: string
*               example: ""
*             role:
*               type: string
*               example: ""
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
*           - stops
*           - gender
*           - passportName
*           - role
*     responses:
*       '201':
*             description: Multi city request created successfully.
*       '400':
*             description: Please double checks your departure and arrival dates.
* */

/**
 * @swagger
 * /api/v1/trips/view-pending:
 *   get:
 *     security:
 *       - bearerAuth: []
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

/**
* @swagger
* /api/v1/trips/{requestId}/confirm:
*   put:
*     security:
*       - bearerAuth: []
*     tags:
*       - Trips
*     name: re-confirm a trip request
*     summary: manager should be able to re-confirm a trip request decision
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: requestId
*         in: path
*     responses:
*       '200':
*             description: request re-confirmed.
* */

/**
* @swagger
* /api/v1/trips/{requestId}/reject:
*   patch:
*     tags:
*       - Trips
*     name: reject a trip request
*     summary: manager should be able to reject a trip request
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: requestId
*         in: path
*     responses:
*       '200':
*             description: Request rejected successfully.
*       '401':
*             description: This request is not yours it is for another manager
* */

/**
* @swagger
* /api/v1/trips/{requestId}/approve:
*   patch:
*     tags:
*       - Trips
*     name: approve a trip request
*     summary: manager should be able to approve a trip request
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: requestId
*         in: path
*     responses:
*       '200':
*             description: Request approved.
*       '404':
*             description: request with that id and still open is not found in your direct report
* */

/**
* @swagger
* /api/v1/trips/search:
*   get:
*     tags:
*       - Trips
*     name: search a trip request
*     summary: user can search for a trip request using different request attribute
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: id
*         in: query
*       - name: location
*         in: query
*       - name: destination
*         in: query
*       - name: departureDate
*         in: query
*       - name: returnDate
*         in: query
*       - name: reason
*         in: query
*       - name: status
*         in: query
*     responses:
*       '200':
*             description: request found.
*       '404':
*             description: request not found.
* */

/**
 * @swagger
 * /api/v1/trips/{requestId}/view:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trips
 *     name: User view a trip request
 *     summary: User or his manager should be able to view a trip request he made
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: requestId
 *         in: path
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Request found
 *       '401':
 *         description: You are not authorized to perform this action
 *       '404':
 *         description: Request not found or not yours
 */

/**
 * @swagger
 * /api/v1/trips/view:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trips
 *     name: Manager or requester view trip requests
 *     summary: Requester and manager should be able to view all requests the requester's requests
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
 *         description: Requests found
 *       '404':
 *         description: Requests not found
 *       '401':
 *         description: You are not authorized to perform this action
 */
/**
 * @swagger
 * /api/v1/trips/most-travelled:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trips
 *     name: Most travelled destination
 *     summary:  Users should be able to view the most travelled destination
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
 *         description: Most travelled destination.
 *       '401':
 *         description: You are not authorized to perform this action
 */
