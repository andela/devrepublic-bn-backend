import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const {
  expect
} = chai;
let token;
let anotherUserToken;
chai.use(chaiHttp);

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

describe('EDIT TRIP TESTS', () => {
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
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should return trip does not exist or has been approved or rejected', (done) => {
    chai
      .request(index)
      .patch('/api/v1/trips/edit')
      .set('token', token)
      .send(closedRequest)
      .end((_err, res) => {
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
