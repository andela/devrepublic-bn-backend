import chai from 'chai';
import dotenv from 'dotenv';
import ioClient from 'socket.io-client';
import chaiHttp from 'chai-http';
import sgMail from '@sendgrid/mail';
import sinon from 'sinon';
import index, { server } from '../index';
import { provideToken } from '../utils/tokenHandler';


const {
  expect
} = chai;
let token;
let anotherUserToken;
chai.use(chaiHttp);
dotenv.config();
const openRequest = {
  id: '51e74db7-5510-4f50-9f15-e23710331ld5',
  location: 'Kigali',
  destination: 'Nairobi',
  departureDate: '2020-12-10',
  reason: 'I am attending the meeting',
  gender: 'Male',
  passportName: 'Jimmy Ntare',
  role: 'requester'
};

const closedRequest = {
  id: 't1e74db7-h610-4f50-9f45-e2371j331ld5',
  location: 'Kigali',
  destination: 'Nairobi',
  departureDate: '2020-12-10',
  reason: 'I am attending the meeting',
  gender: 'Male',
  passportName: 'Jimmy Ntare',
  role: 'requester'
};
const socketToken = provideToken('0119b84a-99a4-41c0-8a0e-6e0b6c385165', true, 'umuhozad@andela.com', 'manager');
describe('EDIT TRIP TESTS', () => {
  let clientSocket;
  const BASE_URL = process.env.BASE_URL || `http://localhost:${server.address().port}`;
  beforeEach((done) => {
    sinon.stub(sgMail, 'send').resolves({
      to: 'aime@amgil.com',
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
  before((done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jeanne@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should return trip has been updated successfully', (done) => {
    chai
      .request(index)
      .patch('/api/v1/trips/edit')
      .set('token', token)
      .send(openRequest)
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
    clientSocket.on('notification', (msg) => {
      expect(JSON.parse(msg)).to.be.an('object');
      expect(JSON.parse(msg).receiverId).to.equal('0119b84a-99a4-41c0-8a0e-6e0b6c385165');
      expect(JSON.parse(msg).status).to.equal('unread');
      done();
    });
  });
  it('should return trip does not exist or has been approved or rejected', (done) => {
    chai
      .request(index)
      .patch('/api/v1/trips/edit')
      .set('token', token)
      .send(closedRequest)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  before((done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        anotherUserToken = res.body.data;
        done();
      });
  });
  it('should return trip does not exist or has been approved or rejected', (done) => {
    chai
      .request(index)
      .patch('/api/v1/trips/edit')
      .set('token', anotherUserToken)
      .send(closedRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should return only the requester of this trip can edit the trip.', (done) => {
    chai
      .request(index)
      .patch('/api/v1/trips/edit')
      .set('token', anotherUserToken)
      .send(openRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
