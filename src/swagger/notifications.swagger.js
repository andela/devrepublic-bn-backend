/**
 * @swagger
 * /api/v1/notifications/all-read:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notifications
 *     name: markAllNotificationsAsRead
 *     summary: enables a user to mark all as read
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *     responses:
 *       '200':
 *             description: all unread notifications marked as read.
 *       '404':
 *             description: no unread notifications.
 *       '500':
 *             description: Server Error.
 * */


/**
 * @swagger
 * /public/:
 *   get:
 *     tags:
 *       - Notifications
 *     name: Get Notifications
 *     summary: get user notifications in real-time
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token of the user
 *     responses:
 *       '200':
 *             description: Your request has been approved
 * */
