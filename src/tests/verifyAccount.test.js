import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import {
  email, id, isVerified, wrongEmail, wrongId
} from './verifyAccountMock';
import provideToken from '../utils/provideToken';

const token = provideToken(id, isVerified, email);
const wrongToken = provideToken(wrongId, isVerified, wrongEmail);


const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Verification tests', () => {
  it('should return account verified created sucessfully.', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${token}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(`User with ${email} has been verified`);
        done();
      });
  });
  it('should return account is already verified.', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${token}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(202);
        expect(res.body.message).to.equal(`${email} is already verified`);
        done();
      });
  });
  it('should return you are not authorized to access this page..', (done) => {
    chai.request(index)
      .get(`/api/v1/auth/verification?token=${wrongToken}&email=${email}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Sorry, you are not authorized to access this page.');
        done();
      });
  });
});
