/**
 * @swagger
 * definitions:
 *   setRoles:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       role:
 *         type: string
 *       required:
 *         - email
 *         - role
 */

/**
 * @swagger
 * /api/v1/user/setRoles:
 *   patch:
 *     tags:
 *       - User Roles
 *     name: updateRoles
 *     summary: updates the roles of a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/setRoles'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             role:
 *               type: string
 *         required:
 *           - email
 *           - role
 *     responses:
 *       '200':
 *             description: User role successfully updated.
 *       '401':
 *             description: Unauthorized.
 *       '409':
 *             description: User roles already set.
 * */
