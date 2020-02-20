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
describe('Forgot password feature', () => {
  it('should not send an email to the user who didn\'t provide valid email', (done) => {
    chai
      .request(index)
      .put('/api/v1/auth/forgotPassword')
      .send({
        email: 'jeanandela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal('The email field must contain a valid email address');
        done();
      });
  });
  it('should not send an email to the user who isn\'t sign up', (done) => {
    chai
      .request(index)
      .put('/api/v1/auth/forgotPassword')
      .send({
        email: 'jean12@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('user not found, check your input for any mistake');
        done();
      });
  });
  it('should send an email to the user who  sign up', (done) => {
    chai
      .request(index)
      .put('/api/v1/auth/forgotPassword')
      .send({
        email: 'jean@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('check your email to reset your password');
        done();
      });
  });
});
describe('reset password feature', () => {
  before((done) => {
    const loggedUser = {
      email: 'jeanne@andela.com',
      password: 'Bien@BAR789',
    };
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send(loggedUser)
      .end((err, res) => {
        token = res.body.data;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should  not reset password for user who didn\'t provide valid password', (done) => {
    chai
      .request(index)
      .put(`/api/v1/auth/resetpassword?token=${token}`)
      .send({
        password: '@qwe',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error[0]).to.equal('At least 8 characters include symbols, uppercase, lowercase and number');
        done();
      });
  });
  it('should reset password', (done) => {
    chai
      .request(index)
      .put(`/api/v1/auth/resetpassword?token=${token}`)
      .send({
        password: '@WQWD123FRFs',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('password reset successfully');
        done();
      });
  });
  it('should not reset password when the user is not signup', (done) => {
    chai
      .request(index)
      .put(`/api/v1/auth/resetpassword?token=${notSignupToken}`)
      .send({
        password: '@fnfrjfrA',
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('you are not allowed to perform this action');
        done();
      });
  });
  it('should not reset password when the user hasn\'t provided a valid token', (done) => {
    chai
      .request(index)
      .put('/api/v1/auth/resetpassword?token=jfbejrbfje')
      .send({
        password: '@fnfrjfrA',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('token must be provided and valid');
        done();
      });
  });
});
