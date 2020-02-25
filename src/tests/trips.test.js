import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect
} = chai;

let token;
const location = 'kigali',
  destination = 'Nairobi',
  departureDate = '2020-12-10',
  reason = 'I am attending the meeting',
  accomodation = '5be72db7-5510-4a50-9f15-e23f103116d5';
const invalidMulricityRequest = {
  location: 'Kigali',
  destination: 'Nairobi',
  reason: 'eaqtng and traveling',
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
  departureDate: '2019-09-03',
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
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
  departureDate: '2019-09-03',
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
  reason: 'eaqtng and traveling',
  accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
  departureDate: '2019-09-11',
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
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Jimmy',
        lastName: 'Ntare',
        email: 'Ntare@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        ({ token } = { token: res.body.token });
        done();
      });
  });
  it('User should post a one way trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/one-way')
      .set('token', token)
      .send({
        location, destination, departureDate, reason, accomodation
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
        location, destination, departureDate, reason, accomodation
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
});
