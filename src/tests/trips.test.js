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
});
