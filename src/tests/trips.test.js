import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import dotenv from 'dotenv';
import ioClient from 'socket.io-client';
import sgMail from '@sendgrid/mail';
import app, { server } from '../index';
import { provideToken } from '../utils/tokenHandler';

dotenv.config();

const {
  expect
} = chai;

let token, managerToken;
const
  managerId = '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  location = 'kigali',
  destination = 'Nairobi',
  departureDate = '2020-12-10',
  reason = 'I am attending the meeting',
  gender = 'Male',
  passportName = 'Jimmy Ntare',
  role = 'requester';

const invalidMulticityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  reason: 'eaqtng and traveling',
  departureDate: '2019-09-03',
  gender,
  passportName,
  role,
  stops: [{
    stopName: 'Uganda office',
    reason: 'Greet new members',
    stopArrivalDate: '2019-09-14',
    stopDepartureDate: '2019-09-20'
  },
  {
    stopName: 'EUROPE office',
    reason: 'pick required documents',
    stopArrivalDate: '2019-09-10',
    stopDepartureDate: '2019-09-27'
  }]
};
const invalidDatesMulticityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  reason: 'eaqtng and traveling',
  managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  departureDate: '2019-09-03',
  gender,
  passportName,
  role,
  stops: [{
    stopName: 'Uganda office',
    reason: 'Greet new members',
    stopArrivalDate: '2019-09-02',
    stopDepartureDate: '2019-09-20'
  },
  {
    stopName: 'EUROPE office',
    reason: 'pick required documents',
    stopArrivalDate: '2019-09-10',
    stopDepartureDate: '2019-09-27'
  }]
};
const validDatesMulticityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  reason: 'eaqtng and traveling',
  departureDate: '2019-09-11',
  gender,
  passportName,
  role,
  stops: [{
    stopName: 'Uganda office',
    reason: 'Greet new members',
    stopArrivalDate: '2019-09-18',
    stopDepartureDate: '2019-09-19'
  },
  {
    stopName: 'EUROPE office',
    reason: 'pick required documents',
    stopArrivalDate: '2019-09-20',
    stopDepartureDate: '2019-09-21'
  }]
};

chai.use(chaiHttp);

describe('REQUEST TRIP TESTS', () => {
  const socketToken = provideToken('0119b84a-99a4-41c0-8a0e-6e0b6c385165', true, 'umuhozad@andela.com', 'manager');
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
      });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'umuhozad@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        managerToken = res.body.data;
        done();
      });
  });
  it('User should post a one way trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/one-way')
      .set('token', token)
      .send({
        managerId,
        location,
        destination,
        departureDate,
        reason,
        gender,
        passportName,
        role
      })
      .end((_err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('User should not create a one way trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/one-way')
      .set('token', token)
      .send({
        managerId,
        location,
        destination,
        departureDate,
        reason,
        gender,
        passportName,
        role
      })
      .end((_err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('Request already exist');
        done();
      });
  });
  it('User should not create a multi city trip request when dates are wrongly set', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multi-city')
      .set('token', token)
      .send(invalidMulticityRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Check your STOPS arrival and depature dates');
        done();
      });
  });
  it('User should not create a multi city trip request when arrival date is less than departure', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multi-city')
      .set('token', token)
      .send(invalidDatesMulticityRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal(`the arrival to ${invalidDatesMulticityRequest.stops[0].stopName} date must be greater than your trip departure date`);
        done();
      });
  });
  it('User should create successfully a multi city trip request', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multi-city')
      .set('token', token)
      .send(validDatesMulticityRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Multi city request created successfully');
        expect(res.body.data.stops[0].stopName).to.equal('Uganda office');
        expect(res.body.data.stops[0].reason).to.equal('Greet new members');
        expect(res.body.data.stops[0].stopArrivalDate).to.equal('2019-09-18');
        expect(res.body.data.stops[0].stopDepartureDate).to.equal('2019-09-19');
        done();
      });
  });
  it('User should not create a one way trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/one-way?remember=true')
      .set('token', token)
      .send({
        location, destination, departureDate, reason, gender, passportName, role
      })
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Please update your profile with gender, passport name and role');
        done();
      });
  });
});
describe('SEARCH TESTS', () => {
  it('should return an error if the query given are not the right format', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/search?status=red$id=3234')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal('status can only be open, rejected or approved');
        done();
      });
  });
  it('should return an error if the request searched doesn\'t exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/search?id=0e0f29e3-e3ca-419a-bf54-a085e03eeedb')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('request not found');
        done();
      });
  });
  it('should return an array with the request that meet the search conditions', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/search?status=rejected')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('requests found');
        done();
      });
  });
  it('should return an array with the request that meet the search conditions', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/search?reason=meeting')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('requests found');
        done();
      });
  });
});
