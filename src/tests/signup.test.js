import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const {
  expect
} = chai;
chai.use(chaiHttp);
describe('Signup Tests', () => {
  it('should return account created sucessfully.', (done) => {
    chai.request(index)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'bienaime',
        lastName: 'jeanb',
        email: 'aime@andela.com',
        password: 'Aime12&*'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('User successfully registered');
        done();
      });
  });
  it('should return email already exist.', (done) => {
    chai.request(index)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'bienaime',
        lastName: 'jeanb',
        email: 'aime@andela.com',
        password: 'Aime12&*'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('Email already exists');
        done();
      });
  });
  it('should return Lastname must be atleast 4 characters.', (done) => {
    chai.request(index)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'bienaime',
        lastName: 'j',
        email: 'aime@andela.com',
        password: 'Baime12345$@'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Lastname must be atleast 4 characters');
        done();
      });
  });
});
