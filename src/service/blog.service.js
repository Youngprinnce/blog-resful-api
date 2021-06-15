/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { logger } = require('../../utils/logger');

module.exports = {
  Blog() {
    return {
      async create(blog) {
        try {
          const newBlog = await Blog.create(blog);

          if (newBlog) {
            return { message: 'Success', blogId: newBlog._id };
          }
        } catch (ex) {
          logger.log({
            level: 'error',
            message: ex.message,
          });
          return { error: 'something went wrong' };
        }
      },

      async getAll({ offset = 0, limit = 100 } = {}) {
        // eslint-disable-next-line no-return-await
        return await Blog.find({}).select({
          title: 1,
          image: 1,
          body: 1,
          updatedAt: 1,
          createdAt: 1,
        }).skip(offset).limit(limit);
      },

      async getBlog(blogId) {
        try {
          const blog = await Blog.findById(blogId);
          const response = blog.toObject();
          delete response.__v;
          if (!blog) {
            return { error: 'Blog not found' };
          }
          return response;
        } catch (error) {
          logger.log({
            level: 'error',
            message: error,
          });
          return { error: 'Something went wrong' };
        }
      },

      async updateBlog(blogId, blog) {
        try {
          let updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, blog, { new: true });
          if (updatedBlog) {
            updatedBlog = updatedBlog.toObject();
            delete updatedBlog.__v;
            return updatedBlog;
          }
        } catch (ex) {
          logger.log({
            level: 'error',
            message: ex.message,
          });
          return { error: 'something went wrong' };
        }
      },

      async deleteBlog(blogId) {
        try {
          const blog = await Blog.findById(blogId);

          if (!blog) {
            return { error: 'Blog not found' };
          }

          const deleteBlog = await Blog.findOneAndDelete({ _id: blogId });
          if (!deleteBlog) {
            return { error: 'Something went wrong' };
          }

          const deleteBlogCommentExist = await Comment.findOne({ blogId });
          if (!deleteBlogCommentExist) {
            return { message: 'success' };
          }

          const deleteBlogComment = await Comment.findOneAndUpdate({ blogId });
          if (deleteBlogComment) {
            return { message: 'success' };
          }
          return { error: 'Something went wrong' };
        } catch (ex) {
          logger.log({
            level: 'error',
            message: ex.message,
          });
          return { error: 'something went wrong' };
        }
      },
    };
  },
};
