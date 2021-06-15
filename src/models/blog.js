const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
