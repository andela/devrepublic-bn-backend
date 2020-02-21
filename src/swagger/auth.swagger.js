/**
 * @swagger
 * /api:
 *   get:
 *     description: Display welcome message
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Welcome to devRepublic Barefoot Nomad API
 */

/**
 * @swagger
 * definitions:
 *   register:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - User
 *     name: Signup
 *     summary: Signup a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/register'
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - password
 *     responses:
 *       '201':
 *             description: User created.
 *       '400':
 *             description: Bad request.
 *       '409':
 *             description: User already exist.
 * */

/**
 * @swagger
 * definitions:
 *   login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - User
 *     name: login
 *     summary: login a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/login'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *             description: User logged in.
 *       '400':
 *             description: Bad request.
 *       '401':
 *             description: Incorrect email or password.
 * */

/**
 * @swagger
 * /:
 *   get:
 *     description: Display welcome message
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Welcome to devRepublic Barefoot Nomad API
 */
/**
 * @swagger
 * definitions:
 *   register:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - User
 *     name: Signup
 *     summary: Signup a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/register'
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - password
 *     responses:
 *       '201':
 *             description: User created.
 *       '400':
 *             description: Bad request.
 *       '409':
 *             description: User already exist.
 * */
/**
 * @swagger
 * definitions:
 *   login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - email
 *         - password
 */
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - User
 *     name: login
 *     summary: login a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/login'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *             description: User logged in.
 *       '400':
 *             description: Bad request.
 *       '401':
 *             description: Incorrect email or password.
 * */
/**
 * @swagger
 * /api/v1/auth/verification/token={token}&email={email}:
 *   get:
 *     tags:
 *       - User
 *     name: verify
 *     summary: verify the email of the user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: token of the user including their id no and their email
 *       - name: email
 *         in: path
 *         description: email of the user
 *     responses:
 *       '200':
 *             description: User with ${email} has been verified.
 *       '202':
 *             description: ${email} is already verifiedt.
 *       '401':
 *             description: Sorry, you are not authorized to access this page.
 * */

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     tags:
 *       - User
 *     name: google authentication
 *     summary: login or signup using google authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         in: path
 *         description: first name of the user
 *       - name: lastName
 *         in: path
 *         description: last name of the user
 *       - name: email
 *         in: path
 *         description: google email of the user
 *     responses:
 *       '200':
 *             description: User with ${email} has been verified.
 *       '202':
 *             description: ${email} is already verifiedt.
 *       '401':
 *             description: Sorry, you are not authorized to access this page.
 * */

/**
 * @swagger
 * /api/v1/auth/facebook:
 *   get:
 *     tags:
 *       - User
 *     name: google authentication
 *     summary: login or signup using google authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         in: path
 *         description: first name of the user
 *       - name: lastName
 *         in: path
 *         description: last name of the user
 *       - name: email
 *         in: path
 *         description: email of the user
 *     responses:
 *       '200':
 *             description: User with ${email} has been verified.
 *       '202':
 *             description: ${email} is already verifiedt.
 *       '401':
 *             description: Sorry, you are not authorized to access this page.
 * */


/**
 * @swagger
 * definitions:
 *   logout:
 *     type: object
 */
/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - User
 *     name: logout
 *     summary: Logs a user out
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *             description: User is successfully logged out
 * */

/**
 * @swagger
 * definitions:
 *   forgotPassword:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       required:
 *         - email
 */

/**
 * @swagger
 * /api/v1/auth/password/forgot:
 *   put:
 *     tags:
 *       - User
 *     name: forgot password
 *     summary: send email when user forgot password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *         required:
 *           - email
 *     responses:
 *       '200':
 *             description: check your email to reset your password.
 *       '404':
 *             description: user not found, check your input for any mistake.
 * */

/**
 * @swagger
 * definitions:
 *   resetpassword:
 *     type: object
 *     properties:
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - password
 */
/**
* @swagger
* /api/v1/auth/password/reset:
*   put:
*     tags:
*       - User
*     name: reset password
*     summary: reset user password
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
*             password:
*               type: string
*               format: password
*         required:
*           - password
*     responses:
*       '200':
*             description: password reset successfully.
* */

/**
 * @swagger
 * definitions:
 *   assignManager:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: string
 *       managerId:
 *         type: string
 *         format: string
 *       required:
 *         - id
 *         - managerId
 */

/**
 * @swagger
 * /api/v1/auth/assign/manager:
 *   patch:
 *     tags:
 *       - user
 *     name: Assign manager
 *     summary: assign a manager to a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: string
 *             managerId:
 *               type: string
 *               format: string
 *         required:
 *           - id
 *           - managerId
 *     responses:
 *       '200':
 *             description: `${existingUser.firstName}'s manager updated successfully`.
 *       '401':
 *             description: 'you are not authorised for this operation.'
 *       '401':
 *             description: 'One or both user ID\'s do not exist'
 *       '401':
 *             description:'User does not exist or they are not a manager or they are both managers'
 *       '500':
 *             description: 'Server Error'
 * */
