import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import googleMock from './mocks/googleMock';
import db from '../models';
import authController from '../controllers/authController';

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Google oAuthentication tests', () => {
  it('should test google redirect route', (done) => {
    chai
      .request(index)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
  it('should save data from google into the database', async () => {
    const { email } = googleMock.request.user;
    await authController.oAuthLogin(googleMock.request, googleMock.response);
    const user = await db.User.findOne({ where: { email } });
    expect(email).to.equal(user.email);
  });
});
