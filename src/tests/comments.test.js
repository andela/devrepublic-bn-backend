import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ioClient from 'socket.io-client';
import sgMail from '@sendgrid/mail';
import app, { server } from '../index';

import { provideToken } from '../utils/tokenHandler';

const {
  expect
} = chai;
dotenv.config();
let requesterToken, managerToken, wrongManagerToken;
const requestId = '51e74db7-5510-4f50-9f15-e23710331ld5';
const wrongRequestId = '51e74db7-5510-4f50-9f15-e23710331ld555';
chai.use(chaiHttp);

describe('COMMENTS TESTS', () => {
  const socketToken = provideToken('79660e6f-4b7d-4g21-81re-74f54e9e1c8a', true, 'jeanne@andela.com', 'requester');
  let clientSocket;
  const BASE_URL = process.env.BASE_URL || `http://localhost:${server.address().port}`;
  beforeEach((done) => {
    sinon.stub(sgMail, 'send').resolves({
      to: 'jeanaime@andela.com',
      from: 'devrepublic.team@gmail.com',
      subject: 'barefoot nomad',
      html: 'this is stubbing message'
    });
    clientSocket = ioClient.connect(BASE_URL, {
      transportOptions: {
        polling:
      { extraHeaders: { token: socketToken } }
      },
      'force new connection': true,
      forceNew: true,
    });
    done();
  });
  afterEach((done) => {
    clientSocket.disconnect();
    sinon.restore();
    done();
  });
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
      });
    clientSocket.on('notification', (msg) => {
      expect(JSON.parse(msg)).to.be.an('object');
      expect(JSON.parse(msg).receiverId).to.equal('79660e6f-4b7d-4g21-81re-74f54e9e1c8a');
      expect(JSON.parse(msg).status).to.equal('unread');
      expect(JSON.parse(msg).content).to.equal('your manager posted a comment');
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
