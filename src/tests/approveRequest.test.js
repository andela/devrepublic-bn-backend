import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect
} = chai;
chai.use(chaiHttp);
let managerToken;
let token;
const openRequest = '5cb6bd43-f4ab-4fd9-86c6-37075e4f7957';
const rejectedRequest = 't1e74db7-h610-4f50-9f45-e2371j331ld4';

describe('APPROVE REQUEST', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'umuhozad@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        managerToken = res.body.data;
      });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jules@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('it should send an error if request is not found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/232rferfefeefef342/approve')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('An open request with that id is not found in your direct report');
        done();
      });
  });
  it('it should send an error if the manager is not the user manager', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${openRequest}/approve`)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('An open request with that id is not found in your direct report');
        done();
      });
  });
  it('should send an error if the request is not open', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${rejectedRequest}/approve`)
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('An open request with that id is not found in your direct report');
        done();
      });
  });
  it('should approve the request', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${openRequest}/approve`)
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('request approved');
        done();
      });
  });
});
