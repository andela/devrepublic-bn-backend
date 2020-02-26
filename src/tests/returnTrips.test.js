import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { provideToken } from '../utils/tokenHandler';

const {
  expect
} = chai;
chai.use(chaiHttp);
let token;
const notSignupToken = provideToken('dewdwwdwd', false, 'ade@gmail.com');
describe('create a return trip', () => {
  before((done) => {
    const loggedUser = {
      email: 'jeannette@andela.com',
      password: 'Bien@BAR789',
    };
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send(loggedUser)
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should not create a return trip if the accomondation is not available in the destination', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', token)
      .send({
        destination: 'Nairobi',
        location: 'Kigali',
        departureDate: '2020-03-15',
        returnDate: '2020-05-01',
        reason: 'vacation',
        accomodation: 'kigali',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('the accomondation doesn\'t exist or it\'s not in your destination');
        done();
      });
  });
  it('should create a return trip if all the data are given', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', token)
      .send({
        destination: 'Nairobi',
        location: 'Kigali',
        departureDate: '2020-03-15',
        returnDate: '2020-05-01',
        reason: 'vacation',
        accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Request created successfully');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.destination).to.equal('Nairobi');
        expect(res.body.data.location).to.equal('Kigali');
        expect(res.body.data.departureDate).to.equal('2020-03-15');
        expect(res.body.data.returnDate).to.equal('2020-05-01');
        expect(res.body.data.accomodation).to.equal('5be72db7-5510-4a50-9f15-e23f103116d5');
        expect(res.body.data.reason).to.equal('vacation');
        done();
      });
  });
  it('should not create a return trip if there is another trips with the same departure date', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', token)
      .send({
        destination: 'Nairobi',
        location: 'Kigali',
        departureDate: '2020-03-15',
        returnDate: '2020-05-30',
        reason: 'vacation',
        accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('request with the same departure date exist');
        done();
      });
  });
  it('should not create a return trip if the return date is greater than the departure date', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', token)
      .send({
        destination: 'Nairobi',
        location: 'Kigali',
        departureDate: '2020-03-15',
        returnDate: '2020-02-01',
        reason: 'vacation',
        accomodation: '5be72db7-5510-4a50-9f15-e23f103116d5',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('the return date must be greater than departure date');
        done();
      });
  });
  it('shouldn\'t create a return trip if all the data aren\'t given', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', token)
      .send({
        location: 'kigali',
        departureDate: '2020-04-15',
        returnDate: '2020-05-01',
        reason: 'vacation',
        accomodation: 'sfdmefkef',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal('destination is required');
        done();
      });
  });
  it('shouldn\'t create a return trip if the user is not signup', (done) => {
    chai
      .request(index)
      .post('/api/v1/trips/return')
      .set('token', notSignupToken)
      .send({
        destination: 'Nairobi',
        location: 'Kigali',
        departureDate: '2020-03-15',
        returnDate: '2020-05-01',
        reason: 'vacation',
        accomadationID: 'sfdmefkef',
        gender: 'Male',
        passportName: 'Jimmy Ntare',
        role: 'requester'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
});
