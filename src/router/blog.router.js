const blogRoute = require('../core/routerConfig');
const blogController = require('../controller/blog.controller');

blogRoute.post('/create', blogController.create);
blogRoute.get('/get-all', blogController.getAll);
blogRoute.get('/:blogId', blogController.getBlog);
blogRoute.put('/update/:blogId', blogController.updateBlog);
blogRoute.delete('/delete/:blogId', blogController.deleteBlog);

module.exports = blogRoute;
