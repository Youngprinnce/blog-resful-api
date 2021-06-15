const commentRoute = require('../core/routerConfig');
const commentController = require('../controller/comment.controller');

commentRoute.post('/create/:blogId', commentController.create);
commentRoute.get('/blog-comments/:blogId', commentController.blogComments);
commentRoute.get('/get-comment/:blogId/:commentId', commentController.getCommentByID);
commentRoute.put('/update/:blogId/:commentId', commentController.updateComment);
commentRoute.delete('/delete/:blogId/:commentId', commentController.deleteComment);

module.exports = commentRoute;
