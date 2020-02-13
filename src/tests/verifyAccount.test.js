import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { token, email } from './verifyAccountMock';

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Verification test', () => {
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
});
