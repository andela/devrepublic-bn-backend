import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

let token;
let unauthToken;

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('AVAIL REQUESTS FOR APPROVAL', () => {
  before((done) => {
    chai
      .request(index)
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
  it('should pending requests to approve', (done) => {
    chai
      .request(index)
      .get('/api/v1/trips/view-pending')
      .set('token', token)
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  before((done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jim@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        unauthToken = res.body.data;
        done();
      });
  });
  it('should return that your not authorised for this operation', (done) => {
    chai
      .request(index)
      .get('/api/v1/trips/view-pending')
      .set('token', unauthToken)
      .end((_err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
