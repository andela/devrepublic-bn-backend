/**
* @swagger
* /api/v1/comments/{requestId}/post:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Comments
*     name: post a comment on a request
*     summary: Requester and manager should be able to comment on a certain request
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
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             comment:
*               type: string
*     properties:
*       comment:
*         type: string
*       required:
*         - comment
*     responses:
*       '200':
*             description: Comment is successfully posted.
*       '401':
*             description: This request belongs to another user and manager.
* */

/**
* @swagger
* /api/v1/comments/{commentId}:
*   delete:
*     security:
*       - bearerAuth: []
*     tags:
*       - Comments
*     name: delete a comment on a request
*     summary: Requester and manager should be able to delete a comment they made
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: token
*         in: header
*         description: jwt token of the user
*       - name: commentId
*         in: path
*     properties:
*       commentId:
*         type: string
*       required:
*         - commentId
*     responses:
*       '200':
*             description: Comment is successfully deleted.
*       '404':
*             description: Comment not found
* */
