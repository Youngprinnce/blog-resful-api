/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const Blog = require('../models/blog');
const Comment = require('../models/comment');
const server = require('../../server');

describe('Comment endpoint', () => {
  before((done) => {
    Blog.remove({}, (err) => {
      done();
    });
  });

  before((done) => {
    Comment.remove({}, (err) => {
      done();
    });
  });

  describe('/POST create comment.', () => {
    it('it should create comment for a blog post.', (done) => {
      const newBlog = new Blog({
        title: 'Hello',
        body: 'World',
      });
      newBlog.save((err, blog) => {
        const newComment = {
          comment: 'My testing comment',
          blogId: blog._id,
        };

        chai.request(server)
          .post(`/api/v1/comment/create/${blog._id}`)
          .send(newComment)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.comments.should.be.a('array');
            res.body.should.have.property('message').eql('success');
            done();
          });
      });
    });
  });

  describe('/GET get comments.', () => {
    it('it should get all comment for a blog post.', (done) => {
      const newBlog = new Blog({
        title: 'Hello',
        body: 'World',
      });
      newBlog.save((err, blog) => {
        chai.request(server)
          .get(`/api/v1/comment/blog-comments/${blog._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.be.a('array');
            res.body.should.have.property('message').eql('success');
            done();
          });
      });
    });
  });
});
