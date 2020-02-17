import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { uploader } from 'cloudinary';
import index from '../index';

const {
  expect
} = chai;

let token;
let unauthToken;
chai.use(chaiHttp);


describe('USER ROLES TESTS', () => {
  it('should login the user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should login another user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        unauthToken = res.body.data;
        done();
      });
  });
  it('should allow super admin to change someones\' role', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', token)
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User roles updated successfully');
        done();
      });
  });
  it('should not allow changing someones\' role if token is wrong', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', 'hggjgjgjhgjgjgdjgjgdf')
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });
  it('should not allow admin to changing someones\' role if no token provided', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', '')
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('No token provided');
        done();
      });
  });
  it('should not allow another user to changing someones\' role', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/setroles')
      .set('token', unauthToken)
      .send({
        email: 'jdev@andela.com',
        role: 'manager'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
});
describe('USER PROFILE TESTS', () => {
  before(() => {
    sinon.stub(uploader, 'upload').returns({ url: 'https://cloudinarysample/image/150' });
  });
  it('should allow user to edit his/her profile', (done) => {
    chai
      .request(index)
      .patch('/api/v1/user/edit-profile')
      .set('token', unauthToken)
      .send({
        language: 'English',
        currency: 'RWF',
        department: 'Finance',
        birthdate: '1998-05-05',
        gender: 'Male',
        residence: 'kiagli'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Profile updated successfully');
        done();
      });
  });
  it('should allow user to view his/her profile', (done) => {
    chai
      .request(index)
      .get('/api/v1/user/view-profile')
      .set('token', unauthToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User profile details');
        done();
      });
  });
  it('should allow user to upload profile image ', (done) => {
    chai
      .request(index)
      .post('/api/v1/user/edit-profile-image')
      .set('token', unauthToken)
      .attach('image', 'src/tests/testFiles/barefoot.jpeg', 'barefoot.jpeg')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Your image has been uploded successfully');
        expect(res.body.data).to.equal('https://cloudinarysample/image/150');
        done();
      });
  });
  it('should NOT allow user to upload profile image with selecting it first', (done) => {
    chai
      .request(index)
      .post('/api/v1/user/edit-profile-image')
      .set('token', unauthToken)
      .attach('image', '', '')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Choose an a picture first');
        done();
      });
  });
});
