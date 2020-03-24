import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sgMail from '@sendgrid/mail';
import app from '../index';

const {
  expect
} = chai;

let token, tokenWithNoRequests, managerToken;
const requestId = 't1e74db7-h610-4f50-9f45-e2371j331ld5';
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
  beforeEach(() => {
    sinon.stub(sgMail, 'send').resolves({
      to: 'aime@amgil.com',
      from: 'devrepublic@gmail.com',
      subject: 'barefoot nomad',
      html: 'this is stubbing message'
    });
  });
  afterEach(() => {
    sinon.restore();
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
describe('VIEW REQUESTS', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'peter@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        tokenWithNoRequests = res.body.data;
        done();
      });
  });
  it('should allow a requester to view one trip', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips/${requestId}/view`)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should allow a manager to view one trip', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips/${requestId}/view`)
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should allow a requester to view all trips', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/view')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('should not view an unexisting trip', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/blahblah/view')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Request not found or not yours');
        done();
      });
  });
  it('should not view unexisting trips', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/view')
      .set('token', tokenWithNoRequests)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Requests not found');
        done();
      });
  });
});

describe('TRIP STATS TESTS', () => {
  it('should return statistics of all requestes for that specific manager', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/stats')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Trips statistics');
        expect(res.body.data.totalTripsNumber).to.equal(10);
        expect(res.body.data.upCommingTrips).to.equal(6);
        expect(res.body.data.pastYears).to.equal(4);
        expect(res.body.data.statusStatistics.openRequests).to.equal(6);
        expect(res.body.data.statusStatistics.approvedRequests).to.equal(2);
        expect(res.body.data.statusStatistics.rejectedRequets).to.equal(2);
        done();
      });
  });
  it('should return statistics of all requestes for that specific requester', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/stats')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Trips statistics');
        expect(res.body.data.totalTripsNumber).to.equal(7);
        expect(res.body.data.upCommingTrips).to.equal(3);
        expect(res.body.data.pastYears).to.equal(4);
        expect(res.body.data.statusStatistics.openRequests).to.equal(3);
        expect(res.body.data.statusStatistics.approvedRequests).to.equal(2);
        expect(res.body.data.statusStatistics.rejectedRequets).to.equal(2);
        done();
      });
  });
});
