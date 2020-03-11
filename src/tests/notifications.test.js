import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
let token;

describe('MARK ALL AS READ TESTS', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should return all notfications marked as read', (done) => {
    chai
      .request(app)
      .patch('/api/v1/notifications/all-read')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('all unread notifications marked as read');
        done();
      });
  });
  it('should return no unread notifications', (done) => {
    chai
      .request(app)
      .patch('/api/v1/notifications/all-read')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('no unread notifications');
        done();
      });
  });
});
