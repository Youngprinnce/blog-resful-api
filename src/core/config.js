require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI,
  PORT: process.env.PORT || 5000,
};
