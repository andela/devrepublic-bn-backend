import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect
} = chai;

let token;
const
  managerId = '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  location = 'kigali',
  destination = 'Nairobi',
  departureDate = '2020-12-10',
  reason = 'I am attending the meeting',
  accomodation = '5be72db7-5510-4a50-9f15-e23f103116d5',
  gender = 'Male',
  passportName = 'Jimmy Ntare',
  role = 'requester';

const invalidMulricityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  reason: 'eaqtng and traveling',
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
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
const invalidDatesMulricityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  reason: 'eaqtng and traveling',
  managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
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
const validDatesMulricityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  reason: 'eaqtng and traveling',
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
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
        accomodation,
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
        accomodation,
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
      .send(invalidMulricityRequest)
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
      .send(invalidDatesMulricityRequest)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal(`the arrival to ${invalidDatesMulricityRequest.stops[0].stopName} date must be greater than your trip departure date`);
        done();
      });
  });
  it('User should create successfully a multi city trip request', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multi-city')
      .set('token', token)
      .send(validDatesMulricityRequest)
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
        location, destination, departureDate, reason, accomodation, gender, passportName, role
      })
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Please update your profile with gender, passport name and role');
        done();
      });
  });
});
