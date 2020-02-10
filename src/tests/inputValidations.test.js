import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { validInputs, invalidInputs } from './inputsMockData';

const {
  expect
} = chai;
chai.use(chaiHttp);
describe('Testing validations', () => {
  it('should return Inputs are successfully checked.', (done) => {
    chai.request(index)
      .post('/validation/inputs')
      .send(validInputs[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Inputs are successfully checked');
        done();
      });
  });
  it('should return Lastname must be atleast 4 characters.', (done) => {
    chai.request(index)
      .post('/validation/inputs')
      .send(invalidInputs[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Lastname must be atleast 4 characters');
        done();
      });
  });
});
