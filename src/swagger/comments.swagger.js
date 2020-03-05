/**
* @swagger
* /api/v1/comments/{requestId}/post:
*   post:
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
