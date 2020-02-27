import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
let token;
let notManagerToken;
let otherManagerToken;
describe('re-confirm request tests', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'umuhozad@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
      });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'ishimwe@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        otherManagerToken = res.body.data;
      });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'peter@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        notManagerToken = res.body.data;
        done();
      });
  });
  it('should return an error message if the user isn\'t a manager', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/75c34027-a2f0-4b50-808e-0c0169fb074c/confirm')
      .set('token', notManagerToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
  it('should return an error message if the request doesn\'t exist', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/:requestID/confirm')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('request not found');
        done();
      });
  });
  it('should return an error message if the manager is not the user assigned manager', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld5/confirm')
      .set('token', otherManagerToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('you are not the assigned manager for this user');
        done();
      });
  });
  it('should return an error message if the request wasn\'t accepted or rejected', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/51e74db7-5510-4f50-9f15-e23710331ld5/confirm')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('the request you are trying to confirm is still open');
        done();
      });
  });
  it('should return an error message if the request is already reconfirmed', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld4/confirm')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('the request is already re-confirmed');
        done();
      });
  });
  it('should re-confirm a request if the request was rejected or accepted', (done) => {
    chai
      .request(app)
      .put('/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld9/confirm')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('request re-confirmed');
        done();
      });
  });
});
