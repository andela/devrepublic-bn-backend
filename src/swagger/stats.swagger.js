/**
 * @swagger
 * /api/v1/trips/stats:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Trips
 *     name: Users can view trip requests
 *     summary:  Users should be able to view stats of created requests
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
 *         description: Requests statistics.
 *       '401':
 *         description: You are not authorized to perform this action
 */
