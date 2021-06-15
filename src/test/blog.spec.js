/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const Blog = require('../models/blog');
const server = require('../../server');

describe('Blog endpoint', () => {
  before((done) => { // Before each test we empty the posts document.
    Blog.remove({}, (err) => {
      done();
    });
  });

  describe('/POST create blog', () => {
    it('it should not create a blog without a body and a title', (done) => {
      const blog = {
        body: '',
        title: '',
      };

      chai.request(server)
        .post('/api/v1/blog/create')
        .send(blog)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('body and title is required.');
          done();
        });
    });

    it('it should create a post using only body and title ', (done) => {
      const blog = {
        title: 'Hello',
        body: 'World',
      };

      chai.request(server)
        .post('/api/v1/blog/create')
        .send(blog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('success');
          done();
        });
    });
  });

  describe('/GET blog', () => {
    it('it should GET all the blog posts', (done) => {
      chai.request(server)
        .get('/api/v1/blog/get-all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.should.be.a('object');
          res.body.data.blogs.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET/:blogId ', () => {
    it('it should GET a single blog post', (done) => {
      const newBlog = new Blog({
        title: 'Hello',
        body: 'World',
      });

      newBlog.save((err, blog) => {
        chai.request(server)
          .get(`/api/v1/blog/${blog._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('body');
            done();
          });
      });
    });
  });

  describe('/PUT/:blogId', () => {
    it('it should UPDATE a blog post', (done) => {
      const newBlog = new Blog({
        title: 'Hello',
        body: 'World',
      });

      const updateBlog = {
        title: 'World',
        body: 'Hello',
      };

      newBlog.save((err, blog) => {
        chai.request(server)
          .put(`/api/v1/blog/update/${blog._id}`)
          .send(updateBlog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('title').eql('World');
            res.body.data.should.have.property('body').eql('Hello');
            done();
          });
      });
    });
  });

  describe('/delete/:blogId', () => {
    it('it should Delete a blog post', (done) => {
      const newBlog = new Blog({
        title: 'Hello',
        body: 'World',
      });

      newBlog.save((err, blog) => {
        chai.request(server)
          .delete(`/api/v1/blog/delete/${blog._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('success');
            done();
          });
      });
    });
  });
});
