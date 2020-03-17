import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
let token;
let secondUserToken;
let thirdUserToken;

describe('LIKE/DISLIKE TESTS', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should return user has unliked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/unlike?id=5be72db7-5510-4a50-9f15-e23f103116d5')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has unliked facility');
        done();
      });
  });
  it('should return user has liked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/like?id=5be72db7-5510-4a50-9f15-e23f103116d5')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has liked facility');
        done();
      });
  });
  it('should return user has already liked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/like?id=5be72db7-5510-4a50-9f15-e23f103116d5')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('user has already liked facility');
        done();
      });
  });
  it('should return user has unliked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/unlike?id=5be72db7-5510-4a50-9f15-e23f103116d5')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has unliked facility');
        done();
      });
  });
  it('should return user has already unliked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/unlike?id=5be72db7-5510-4a50-9f15-e23f103116d5')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('user has already unliked facility');
        done();
      });
  });

  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jeanne@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        secondUserToken = res.body.data;
        done();
      });
  });
  it('should return user has liked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/like?id=5bb72db7-5514-4a50-9g15-e23f103116d3')
      .set('token', secondUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has liked facility');
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'peter@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        thirdUserToken = res.body.data;
        done();
      });
  });
  it('should return user has liked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/like?id=5bb72db7-5514-4a50-9g15-e23f103116d3')
      .set('token', thirdUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has liked facility');
        done();
      });
  });
  it('should return user has unliked the facility', (done) => {
    chai
      .request(app)
      .patch('/api/v1/facilities/unlike?id=5bb72db7-5514-4a50-9g15-e23f103116d3')
      .set('token', thirdUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user has unliked facility');
        done();
      });
  });
});
