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
  before((done) => {
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
      .patch('/api/v1/users/setroles')
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
      .patch('/api/v1/users/setroles')
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
      .patch('/api/v1/users/setroles')
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
      .patch('/api/v1/users/setroles')
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
      .patch('/api/v1/users/edit-profile')
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
      .get('/api/v1/users/view-profile')
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
      .post('/api/v1/users/edit-profile-image')
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
      .post('/api/v1/users/edit-profile-image')
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

describe('TRAVEL ADMIN ROLE TESTS', () => {
  it('should login the travel admin and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jim@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  it('should allow travel admin to create a facility', (done) => {
    chai
      .request(index)
      .post('/api/v1/users/create/facility')
      .set('token', token)
      .send({
        facility: 'Marriot',
        location: 'Kigali, Rwanda'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Facility created successfully');
        done();
      });
  });
  it('should allow travel admin to create a room', (done) => {
    chai
      .request(index)
      .post('/api/v1/users/create/facility/room')
      .set('token', token)
      .send({
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        roomName: 'Kigali',
        type: 'single bed'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Room created successfully');
        done();
      });
  });
  it('should not allow any other role to create a facility', (done) => {
    chai
      .request(index)
      .post('/api/v1/users/create/facility')
      .set('token', unauthToken)
      .send({
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        roomName: 'Nairobi'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you have to be a travel admin to perform this action');
        done();
      });
  });
  it('should not allow any other role to create a room', (done) => {
    chai
      .request(index)
      .post('/api/v1/users/create/facility')
      .set('token', unauthToken)
      .send({
        facilityId: '463e2dfb-d0b7-447c-900b-7ee031412e76',
        roomName: 'Nairobi',
        type: 'single bed'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you have to be a travel admin to perform this action');
        done();
      });
  });
  it('should not allow travel admin to create a room for a non-existing', (done) => {
    chai
      .request(index)
      .post('/api/v1/users/create/facility/room')
      .set('token', token)
      .send({
        facilityId: 'e806d6fd-23f4-40a9-aae8-922208db7fba',
        roomName: 'Nairobi',
        type: 'single bed'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('This facility does not exist');
        done();
      });
  });
});


describe('ASSIGNING A MANAGER TESTS', () => {
  it('should login the travel admin and return the token', (done) => {
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
  it('should allow super admin to assign a manager', (done) => {
    chai
      .request(index)
      .patch('/api/v1/users/assign/manager')
      .set('token', token)
      .send({
        id: '79660e6f-4b7d-4d21-81re-74f54e9e1c8a',
        managerId: '79660e6f-4b7d-4d21-81ad-74f64e9e1c8a'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
  it('should return that one or all ID\'s do not exist', (done) => {
    chai
      .request(index)
      .patch('/api/v1/users/assign/manager')
      .set('token', token)
      .send({
        id: '768f5b22-c499-44d7-a838-12de26fbab11',
        managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('One or both user ID\'s do not exist');
        done();
      });
  });
  it('should return when both users are managers or one ID does not exist', (done) => {
    chai
      .request(index)
      .patch('/api/v1/users/assign/manager')
      .set('token', token)
      .send({
        id: '79660e6f-4b7d-4d21-81ad-74f64e9e1c8a',
        managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('User does not exist or they are not a manager or they are both managers');
        done();
      });
  });
  it('should return that if user is not authorized to perform an operation', (done) => {
    chai
      .request(index)
      .patch('/api/v1/users/assign/manager')
      .set('token', unauthToken)
      .send({
        id: '79660e6f-4b7d-4d21-81ad-74f64e9e1c8a',
        managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
});
