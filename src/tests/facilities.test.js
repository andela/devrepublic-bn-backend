import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { uploader } from 'cloudinary';
import index from '../index';

const {
  expect
} = chai;

let token;
let supplierToken;
let unauthToken;
chai.use(chaiHttp);

describe('TRAVEL ADMIN ROLE TESTS', () => {
  beforeEach(() => {
    sinon.stub(uploader, 'upload').returns({ url: 'https://cloudinarysample/image/150' });
  });
  afterEach(() => {
    sinon.restore();
  });
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
  it('should login another user and return the token', (done) => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        unauthToken = res.body.data;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should sign in another user', (done) => {
    const loggedUser = {
      email: 'uwase@andela.com',
      password: 'Bien@BAR789',
    };
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send(loggedUser)
      .end((err, res) => {
        supplierToken = res.body.data;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should allow travel admin to create a facility', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', token)
      .attach('image', 'src/tests/testFiles/barefoot.jpeg', 'barefoot.jpeg')
      .field('facilityName', 'serenas')
      .field('location', 'kigali')
      .field('services', 'bar,casino,and massage facility')
      .field('amenities', 'free morning breakfast,and free daily dinner')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Facility created successfully');
        expect(res.body.data.facilityName).to.equal('serenas');
        expect(res.body.data.location).to.equal('kigali');
        expect(res.body.data.services).to.equal('bar,casino,and massage facility');
        expect(res.body.data.amenities).to.equal('free morning breakfast,and free daily dinner');
        expect(res.body.data.numOfRooms).to.equal(0);
        done();
      });
  });
  it('should allow travel admin to create a room', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities/room')
      .set('token', token)
      .send({
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        roomName: 'Kigali',
        type: 'single bed'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Room created successfully');
        done();
      });
  });
  it('should not allow any other role to create a facility', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', unauthToken)
      .send({
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        roomName: 'Nairobi'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you have to be a travel admin or a supplier to perform this action');
        done();
      });
  });
  it('should not allow any other role to create a room', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities/room')
      .set('token', unauthToken)
      .send({
        facilityId: '463e2dfb-d0b7-447c-900b-7ee031412e76',
        roomName: 'Nairobi',
        type: 'single bed'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you have to be a travel admin or a supplier to perform this action');
        done();
      });
  });
  it('should not allow travel admin to create a room for a non-existing', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities/room')
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
describe('SUPPLIER ROLE TESTS', () => {
  beforeEach(() => {
    sinon.stub(uploader, 'upload').returns({ url: 'https://cloudinarysample/image/150' });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should not allow a supplier to create a facility without giving all the info', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', supplierToken)
      .send({
        facilityName: 'serena'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error[0]).to.equal('location is required');
        expect(res.body.error[1]).to.equal('amenities are required');
        expect(res.body.error[2]).to.equal('services are required');
        done();
      });
  });
  it('should not allow a user to create a facility if he is not a supplier or a travel admin', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', unauthToken)
      .attach('image', 'src/tests/testFiles/barefoot.jpeg', 'barefoot.jpeg')
      .field('facilityName', 'serena hotel')
      .field('location', 'kigali')
      .field('services', 'bar, casino,and massage facility')
      .field('amenities', 'free morning breakfast,and free daily dinner')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('you have to be a travel admin or a supplier to perform this action');
        done();
      });
  });
  it('should  create a facility if the user is a supplier', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', supplierToken)
      .field('facilityName', 'serena')
      .field('location', 'kigali')
      .field('services', 'bar,casino,and massage facility')
      .field('amenities', 'free morning breakfast,and free daily dinner')
      .attach('image', 'src/tests/testFiles/barefoot.jpeg', 'barefoot.jpeg')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Facility created successfully');
        expect(res.body.data.facilityName).to.equal('serena');
        expect(res.body.data.location).to.equal('kigali');
        expect(res.body.data.services).to.equal('bar,casino,and massage facility');
        expect(res.body.data.amenities).to.equal('free morning breakfast,and free daily dinner');
        expect(res.body.data.numOfRooms).to.equal(0);
        done();
      });
  });
  it('should  not create the facility exist', (done) => {
    chai
      .request(index)
      .post('/api/v1/facilities')
      .set('token', supplierToken)
      .field({ facilityName: 'serena' })
      .field('location', 'kigali')
      .field('services', 'bar, casino,and massage facility')
      .field('amenities', 'free morning breakfast,and free daily dinner')
      .attach('image', 'src/tests/testFiles/barefoot.jpeg', 'barefoot.jpeg')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('facility already created');
        done();
      });
  });
});
