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
/**
 * @swagger
 * definitions:
 *   profileSettings:
 *     type: object
 *     properties:
 *       language:
 *         type: string
 *       currency:
 *         type: string
 *       department:
 *         type: string
 *       birthdate:
 *         type: string
 *       residence:
 *         type: string
 *       required:
 *         - language
 *         - currency
 *         - department
 *         - birthdate
 *         - gender
 *         - residence
 */

/**
 * @swagger
 * /api/v1/user/edit-profile:
 *   patch:
 *     tags:
 *       - User Profile
 *     name: Edit Profile settings
 *     summary: user can edit his/her profile page
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
 *            language:
 *              type: string
 *            currency:
 *              type: string
 *            department:
 *              type: string
 *            birthdate:
 *              type: string
 *            residence:
 *              type: string
 *         required:
 *         - language
 *         - currency
 *         - department
 *         - birthdate
 *         - gender
 *         - residence
 *     responses:
 *       '200':
 *             description: Profile updated successfully.
 *       '401':
 *             description: Unauthorized.
 *       '409':
 *             description: Invalid token.
 * */
/**
 * @swagger
 * definitions:
 *   profile image:
 *     type: object
 *     properties:
 *       image:
 *         type: file
 *       required:
 *         - image
 */

/**
 * @swagger
 * /api/v1/user/edit-profile-image:
 *   post:
 *     tags:
 *       - User Profile image
 *     name: upload Profile image
 *     summary: user can edit his/her profile image
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: token
 *         in: header
 *       - in: formData
 *         name: image
 *         type: file
 *         schema:
 *           $ref: '#/definitions/edit-profile-image'
 *           type: file
 *           properties:
 *            image:
 *              type: file
 *         required:
 *         - image
 *     responses:
 *       '200':
 *             description: Your image has been uploded successfull
 *       '401':
 *             description: No token provided.
 *       '400':
 *             description: Choose an a picture first.
 * */
/**
 * @swagger
 * /api/v1/user/view-profile:
 *   get:
 *     tags:
 *       - User
 *     name: View Profile settings
 *     summary:  User can view his/her account Profile
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
 *         description: User profile details
 *       '401':
 *         description: No token provided
 */
