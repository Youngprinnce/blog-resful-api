const mongoose = require('mongoose');

async function validateBlog(val) {
  const Blog = mongoose.model('Blog');
  try {
    const blog = await Blog.findById(val).lean().exec();
    return Boolean(blog);
  } catch (ex) {
    return false;
  }
}

module.exports = {
  validateBlog,
};
