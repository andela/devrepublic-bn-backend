/**
 * @swagger
 * /api/v1/facilities:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: createFacility
 *     summary: allows travel admin to create facility
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: image
 *         in: formData
 *         type: file
 *         schema:
 *           type: file
 *           properties:
 *            image:
 *              type: file
 *       - name: token
 *         in: header
 *       - name: facilityName
 *         in: formData
 *         type: string
 *       - name: location
 *         in: formData
 *         type: string
 *       - name: amenities
 *         in: formData
 *         type: string
 *       - name: services
 *         in: formData
 *         type: string
 *     responses:
 *       '201':
 *             description: Facility created successfully.
 *       '401':
 *             description: you have to be a travel admin or a supplier to perform this action.
 *       '500':
 *             description: Server Error.
 * */

/**
 * @swagger
 * /api/v1/facilities/room:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: createRoom
 *     summary: allows travel admin to create room
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
 *           type: object
 *           properties:
 *             facilityId:
 *               type: string
 *             roomName:
 *               type: string
 *             type:
 *               type: string
 *         required:
 *           - facilityId
 *           - roomName
 *           - type
 *     responses:
 *       '200':
 *             description: Room created successfully.
 *       '401':
 *             description: you have to be a travel admin to perform this action.
 *       '500':
 *             description: Server Error.
 * */

/**
 * @swagger
 * /api/v1/facilities/like:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: likeFacility
 *     summary: enables user to like facility
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: id
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required:
 *           - id
 *           - token
 *     responses:
 *       '200':
 *             description: user has liked facility.
 *       '403':
 *             description: user has already liked facility.
 *       '500':
 *             description: Server Error.
 * */

/**
 * @swagger
 * /api/v1/facilities/unlike:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: unlikeFacility
 *     summary: allows travel admin to create room
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: id
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *         required:
 *           - id
 *           - token
 *     responses:
 *       '200':
 *             description: user has unliked facility.
 *       '403':
 *             description: user has already unliked facility.
 *       '500':
 *             description: Server Error.
 * */

/**
 * @swagger
 * /api/v1/facilities/book:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: Bookroom
 *     summary: allows a requester to book a room
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
 *           type: object
 *           properties:
 *             facilityId:
 *               type: string
 *             roomId:
 *               type: string
 *             requestId:
 *               type: string
 *             checkin:
 *               type: string
 *             checkout:
 *               type: string
 *         required:
 *           - facilityId
 *           - roomId
 *           - checkin
 *           - checkout
 *           - requestId
 *     responses:
 *       '200':
 *             description: Booking created successfully.
 *       '404':
 *             description: facility does not exist or is not in that location
 *       '401':
 *             description: request does not exist or is not yours
 *       '500':
 *             description: Server Error.
 * */

/**
 * @swagger
 * /api/v1/facilities/rate/{facilityId}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: rate a facilility
 *     summary: a user can rate a facility they visited
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: rating
 *         in: query
 *         schema:
 *           type: string
 *       - name: facilityId
 *         in: path
 *     responses:
 *       '200':
 *             description: facility rated
 *       '404':
 *             description: facility not found
 *       '403':
 *             description: you haven't visited this facility yet
 *       '400':
 *             description: the rating can only be an integer number less or equal to 5
 * */

/**
 * @swagger
 * /api/v1/facilities/feedback/{facilityId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Facilities
 *     name: give feedback to a facilility
 *     summary: a user can provide feedback to a facility they visited
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: facilityId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             feedback:
 *               type: string
 *         required:
 *           - feedback
 *     responses:
 *       '200':
 *             description: feedback saved successfully
 *       '404':
 *             description: facility not found
 *       '403':
 *             description: you haven't visited this facility yet
 * */
