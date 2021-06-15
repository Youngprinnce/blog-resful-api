// Core Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const InitiateMongoServer = require('./src/db/mongoose');

// Custom Dependencies
InitiateMongoServer();

// Routers
const baseRouter = require('./src/router');
const blogRouter = require('./src/router/blog.router');
const commentRouter = require('./src/router/comment.router');

// App Init
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('tiny'));

// Router Middleware
app.use('/', baseRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/comment', commentRouter);

module.exports = app;
