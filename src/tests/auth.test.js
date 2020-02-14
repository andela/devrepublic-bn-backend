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

describe('LOGIN feature', () => {
  it('should login the user', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not login a non-existing user', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonexisting@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect email or password');
        done();
      });
  });
  it('should not login a user with wrong password', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'wrong password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect email or password');
        done();
      });
  });
});

describe('Logout Tests', () => {
  it('should return log out a user', (done) => {
    chai.request(index)
      .get('/api/v1/auth/logout')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged out');
      });
    done();
  });
});
