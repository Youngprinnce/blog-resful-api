/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const { logger } = require('../../utils/logger');

module.exports = {
  Comment() {
    return {
      async create(blogId, comment) {
        try {
          const blogExist = await Blog.findById(blogId);

          if (!blogExist) {
            return { error: 'Blog not found' };
          }

          const commentBlogExist = await Comment.find({ blogId });

          if (commentBlogExist) {
            let updateBlogComment = await Comment.findOneAndUpdate(
              { blogId }, {
                $push: { comments: { comment } },
              }, { new: true, upsert: true },
            );

            updateBlogComment = updateBlogComment.toObject();
            delete updateBlogComment.__v;

            if (updateBlogComment) {
              return updateBlogComment;
            }
          } else {
            let newComment = await Comment.create({ comment, blogId });
            newComment = newComment.toObject();
            delete newComment.__v;

            if (newComment) {
              return { newComment };
            }
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

      async blogComments(blogId) {
        try {
          const blogExist = await Blog.findById(blogId);

          if (!blogExist) {
            return { error: 'Blog not found' };
          }
          const comments = await Comment.find({ blogId });

          return comments;
        } catch (error) {
          logger.log({
            level: 'error',
            message: error,
          });
          return { error: 'Something went wrong' };
        }
      },

      async getCommentByID(blogId, commentId) {
        try {
          const blogExist = await Blog.findById(blogId);

          if (!blogExist) {
            return { error: 'Blog not found' };
          }

          const comment = await Comment.findOne({ blogId, 'comments._id': commentId }, { _id: 0, 'comments.$': 1 });

          if (!comment) {
            return { error: 'Blog with commentId not found' };
          }
          return comment.comments[0];
        } catch (error) {
          logger.log({
            level: 'error',
            message: error,
          });
          return { error: 'Something went wrong' };
        }
      },

      async updateComment(blogId, commentId, comment) {
        try {
          const blogExist = await Blog.findById(blogId);

          if (!blogExist) {
            return { error: 'Blog not found' };
          }

          let updatedComment = await Comment.findOneAndUpdate(
            {
              blogId,
              'comments._id': commentId,
            },
            {
              $set: {
                'comments.$.comment': comment,
              },
            }, {
              _id: 0, 'comments.$': 1, new: true,
            },
          );

          if (updatedComment) {
            updatedComment = updatedComment.toObject();
            delete updatedComment.__v;
            delete updatedComment.blogId;
            delete updatedComment._id;
            // eslint-disable-next-line eqeqeq
            return updatedComment.comments.find((c) => c._id == commentId);
          }
        } catch (ex) {
          logger.log({
            level: 'error',
            message: ex,
          });
          return { error: 'something went wrong' };
        }
      },

      async deleteComment(blogId, commentId) {
        try {
          const blogExist = await Blog.findById(blogId);

          if (!blogExist) {
            return { error: 'Blog not found' };
          }

          const deleteComment = await Comment.findOneAndUpdate(
            {
              blogId,
              'comments._id': commentId,
            }, {
              $pull: {
                comments: {
                  _id: commentId,
                },
              },
            }, {
              new: true,
            },
          );

          if (deleteComment) {
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
