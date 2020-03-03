import chai from 'chai';
import chaiHttp from 'chai-http';
import sgMail from '@sendgrid/mail';
import sinon from 'sinon';
import index from '../index';
import { provideToken } from '../utils/tokenHandler';
import {
  isVerified,
  wrongEmail,
  wrongId
} from './verifyAccountMock';

const {
  expect
} = chai;
chai.use(chaiHttp);

const wrongToken = provideToken(wrongId, isVerified, wrongEmail);

const newUser = {
  firstName: 'Jean',
  lastName: 'Ntare',
  email: 'jamie@andela.com',
  password: 'Bien@BAR789'
};
const { email } = newUser;
let userToken;
describe('VERIFICATION TESTS', () => {
  beforeEach(() => {
    sinon.stub(sgMail, 'send').resolves({
      to: 'aime@amgil.com',
      from: 'devrepublic.team@gmail.com',
      subject: 'barefoot nomad',
      html: 'this is stubbing message'
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should signup the user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/register')
      .send(newUser)
      .end((err, res) => {
        const { token } = res.body;
        userToken = token;
        done();
      });
  });
  it('should return account verified sucessfully.', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${userToken}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(`User with ${email} has been verified`);
        done();
      });
  });
  it('should return account is already verified.', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${userToken}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(202);
        expect(res.body.message).to.equal(`${email} is already verified`);
        done();
      });
  });
  it('should return you are not authorized to access this page..', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${wrongToken}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Sorry, you are not authorized to access this page.');
        done();
      });
  });
});
