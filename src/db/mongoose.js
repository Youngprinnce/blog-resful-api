require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('../../utils/logger');
const { MONGODB_URI, MONGODB_TEST_URI } = require('../core/config');

const InitiateMongoServer = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connect(MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      logger.info('Test Database connection successful!');
    } else {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      logger.info('Database connection successful!');
    }
  } catch (err) {
    logger.error('Database connection failed!');
    throw err;
  }
};

module.exports = InitiateMongoServer;
