import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect
} = chai;

let requesterToken, managerToken, wrongManagerToken;
const requestId = '51e74db7-5510-4f50-9f15-e23710331ld5';
const wrongRequestId = '51e74db7-5510-4f50-9f15-e23710331ld555';
chai.use(chaiHttp);

describe('COMMENTS TESTS', () => {
  it('should login a user who will comment on a request', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jeanne@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        requesterToken = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should login a manager who will comment on a request', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'umuhozad@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        managerToken = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should login a manager who will not be able comment on a request which does not belong to him', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jules@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        wrongManagerToken = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should allow a manager to comment on a request created by his/her requester', (done) => {
    chai
      .request(app)
      .post(`/api/v1/comments/${requestId}/post`)
      .set('token', managerToken)
      .send({
        comment: 'As a your manager I can add any comment on your request. I can also cancel or approve your request but let me comment first',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Comment is successfully posted');
        expect(res.body).to.have.property('data');
        expect(res.body.data.requestId).to.equal('51e74db7-5510-4f50-9f15-e23710331ld5');
        expect(res.body.data.commmentOwner).to.equal('0119b84a-99a4-41c0-8a0e-6e0b6c385165');
        expect(res.body.data.comment).to.equal('As a your manager I can add any comment on your request. I can also cancel or approve your request but let me comment first');
        done();
      });
  });
  it('should not allow a manager to comment on a request which does not belong to him', (done) => {
    chai
      .request(app)
      .post(`/api/v1/comments/${requestId}/post`)
      .set('token', wrongManagerToken)
      .send({
        comment: 'As a your manager I can add any comment on your request. I can also cancel or approve your request but let me comment first',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('This request has been a created by another user and belongs to another manager');
        done();
      });
  });
  it('should allow a requester to comment on a request he/she created', (done) => {
    chai
      .request(app)
      .post(`/api/v1/comments/${requestId}/post`)
      .set('token', requesterToken)
      .send({
        comment: 'thanks for your comment manager. This is my request too. And please Approve my request after this comment',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Comment is successfully posted');
        expect(res.body).to.have.property('data');
        expect(res.body.data.requestId).to.have.equal('51e74db7-5510-4f50-9f15-e23710331ld5');
        expect(res.body.data.commmentOwner).to.have.equal('79660e6f-4b7d-4g21-81re-74f54e9e1c8a');
        expect(res.body.data.comment).to.have.equal('thanks for your comment manager. This is my request too. And please Approve my request after this comment');
        done();
      });
  });
  it('should not allow a requester to comment on a request that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/comments/${wrongRequestId}/post`)
      .set('token', requesterToken)
      .send({
        comment: 'thanks for your comment manager. This is my request too. And please Approve my request after this comment',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Request not found');
        done();
      });
  });
});
