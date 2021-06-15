const mongoose = require('mongoose');
const { validateBlog } = require('../../utils/validate');

const { Schema } = mongoose;

const commentSchema = new Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    index: true,
    required: true,
    valifdate: validateBlog,
  },
  comments: [
    {
      comment: {
        type: String,
        required: true,
        index: true,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
