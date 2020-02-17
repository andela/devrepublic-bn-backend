import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const {
  expect
} = chai;

let token;
let unauthToken;
chai.use(chaiHttp);

describe('USER ROLES TESTS', () => {
  it('should login the user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should login another user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        unauthToken = res.body.data;

        done();
      });
  });
  it('should allow super admin to change someones\' role', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', token)
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User roles updated successfully');
        done();
      });
  });
  it('should not allow changing someones\' role if token is wrong', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', 'hggjgjgjhgjgjgdjgjgdf')
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });
  it('should not allow admin to changing someones\' role if no token provided', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', '')
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('No token provided');
        done();
      });
  });
  it('should not allow another user to changing someones\' role', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', unauthToken)
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
});
