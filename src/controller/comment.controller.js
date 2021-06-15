const { sendError, sendSuccess } = require('../../utils/responseHandler');
const { throwError } = require('../../utils/handleErrors');
const { Comment } = require('../service/comment.service');

exports.create = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    if (!blogId || !comment) {
      throwError('BlogId and comment is required', 401);
    }

    const response = await Comment().create(blogId, comment);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.blogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      throwError('BlogId is required', 401);
    }

    const response = await Comment().blogComments(blogId);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.getCommentByID = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;

    if (!blogId || !commentId) {
      throwError('blogId and commentId is required', 401);
    }

    const response = await Comment().getCommentByID(blogId, commentId);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { comment } = req.body;

    if (!blogId || !commentId) {
      throwError('blogId and commentId is required', 401);
    }

    if (Object.keys(comment).length === 0 && comment.constructor === Object) {
      throwError('data is required', 401);
    }

    const response = await Comment().updateComment(blogId, commentId, comment);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;

    if (!blogId || !commentId) {
      throwError('blogId and commentId is required', 401);
    }

    const response = await Comment().deleteComment(blogId, commentId);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};
