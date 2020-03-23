
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';


const { expect } = chai;
chai.use(chaiHttp);

let token;
const bookingRoute = '/api/v1/facilities/book';


describe('FACILITY BOOKING', () => {
  before('log in a user', (done) => {
    const loggedUser = {
      email: 'jeanne@andela.com',
      password: 'Bien@BAR789',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loggedUser)
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });

  it('should book a room', (done) => {
    chai
      .request(app)
      .post(bookingRoute)
      .set('token', token)
      .send({
        roomId: 'e5e3373e-757b-4dc0-9c55-867c35eef374',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        checkin: '2018-01-11',
        checkout: '2019-10-10',
        requestId: '51e74db7-5510-4f50-9f15-e23710331ld5'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.body.message).to.equal('Booking created successfully');
        done();
      });
  });
  it('should not book for a request does not exist or is not yours', (done) => {
    chai
      .request(app)
      .post(bookingRoute)
      .set('token', token)
      .send({
        roomId: 'e5e3373e-757b-4dc0-9c55-867c35eef374',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        checkin: '2018-01-11',
        checkout: '2019-10-10',
        requestId: 'blah blah blah blah blah'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should not book an unexisting room', (done) => {
    chai
      .request(app)
      .post(bookingRoute)
      .set('token', token)
      .send({
        roomId: 'blah blah blah blah blah blah',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        checkin: '2018-10-11',
        checkout: '2019-01-10',
        requestId: '51e74db7-5510-4f50-9f15-e23710331ld5'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.body.error).to.equal('this room is booked or it does not exist');
        done();
      });
  });

  it('should not book a room with wrong checkin greater than checkout', (done) => {
    chai
      .request(app)
      .post(bookingRoute)
      .set('token', token)
      .send({
        roomId: 'e5e3373e-757b-4dc0-9c55-867c35eef374',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        checkin: '2019-11-11',
        checkout: '2019-01-10',
        requestId: '51e74db7-5510-4f50-9f15-e23710331ld5'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(400);
        expect(res.body.error).to.equal('the checkout date must be greater than checkin date');
        done();
      });
  });

  it('should not return a request does not exist or is not yours', async () => {
    const requestFound = await db.Request.findOne({
      where: {
        id: 'blah blah blah blah blah',
        email: 'jeanne@andela.com'
      }
    });
    expect(requestFound).to.eq(null);
  });

  it('should not return an unexisting room', async () => {
    const room = await db.Rooms.findOne({
      where: {
        id: 'blah blah blah blah blah blah',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        availability: true
      }
    });
    expect(room).to.eq(null);
  });
});
