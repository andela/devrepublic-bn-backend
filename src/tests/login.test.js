import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('LOGIN feature', () => {
  it('should login the user', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not login a non-existing user', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonexisting@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect email or password');
        done();
      });
  });
  it('should not login a user with wrong password', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'wrong password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect email or password');
        done();
      });
  });
});
