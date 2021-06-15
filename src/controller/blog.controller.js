const { sendError, sendSuccess } = require('../../utils/responseHandler');
const { throwError } = require('../../utils/handleErrors');
const { Blog } = require('../service/blog.service');

exports.create = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      throwError('body and title is required.', 400);
    }

    const response = await Blog().create(req.body);

    if (response.error) {
      throwError(response.error, 401);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.getAll = async (req, res) => {
  const { offset, limit } = req.query;

  const blogs = await Blog().getAll({ offset, limit });

  const response = {
    count: blogs.length,
    blogs,
  };

  return sendSuccess(res, response);
};

exports.getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      throwError('userId is required', 401);
    }

    const response = await Blog().getBlog(blogId);

    if (response.error) {
      throwError(response.error, 404);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = req.body;

    if (Object.keys(blog).length === 0 && blog.constructor === Object) {
      throwError('data is required', 401);
    }

    const response = await Blog().updateBlog(blogId, blog);

    if (response.error) {
      throwError(response.error, 404);
    }

    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const response = await Blog().deleteBlog(blogId);
    if (response.error) {
      return throwError(response.error, 400);
    }
    return sendSuccess(res, response);
  } catch (err) {
    return sendError(res, err);
  }
};
