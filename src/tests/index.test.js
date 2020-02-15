import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Testing index page ', () => {
  it('should return a message from index page.', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to devRepublic Barefoot Nomad API');
        done();
      });
  });
});
