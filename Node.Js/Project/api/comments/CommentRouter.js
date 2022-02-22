const express = require('express')
var CommentRouter = express.Router();
var CommentController = require('./CommentController')
var authController = require('../users/AuthController')
CommentRouter.post('/', authController.protectSystem, CommentController.createComment);
CommentRouter.get('/', CommentController.getAllComments);
module.exports = CommentRouter;
