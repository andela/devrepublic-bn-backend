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
