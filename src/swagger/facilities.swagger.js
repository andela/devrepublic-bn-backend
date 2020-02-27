/**
 * @swagger
 * /api/v1/facilities:
 *   post:
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
 *     tags:
 *       - Facilities
 *     name: likeFacility
 *     summary: enables user to like facility
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: facilityId
 *         in: header
 *         schema:
 *           type: object
 *           properties:
 *             facilityId:
 *               type: string
 *         required:
 *           - facilityId
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
 *     tags:
 *       - Facilities
 *     name: unlikeFacility
 *     summary: allows travel admin to create room
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *       - name: facilityId
 *         in: header
 *         schema:
 *           type: object
 *           properties:
 *             facilityId:
 *               type: string
 *         required:
 *           - facilityId
 *           - token
 *     responses:
 *       '200':
 *             description: user has unliked facility.
 *       '403':
 *             description: user has already unliked facility.
 *       '500':
 *             description: Server Error.
 * */
