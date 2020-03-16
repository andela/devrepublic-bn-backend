import chai from 'chai';
import sinon from 'sinon';
import facilityService from '../../services/facilityService';
import db from '../../models';

const {
  expect
} = chai;
describe('RATE A FACILITY SERVICE TEST', () => {
  const user = {
    id: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
    firstName: 'devrepubli',
    lastName: 'devrpo',
    email: 'jdev@andela.com',
    role: 'requester',
    managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  };
  beforeEach(() => {
    sinon.stub(db.Bookings, 'findOne').resolves({
      id: 'd1d6c6d3-92b3-4000-9f8e-70981c49dc6e',
      roomId: '47d21452-ea54-4f2a-a1df-2c167c34cdd2',
      facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
      checkin: '2020-06-11',
      checkout: '2019-10-10',
      requestId: '51e74db7-5510-4f50-9f15-e23710331ld5',
      bookedBy: 'jdev@andela.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return a string if the facility is not found', async () => {
    const facilityId = '5be72db7-5510-4a50-9f15-e23f103116d3';
    const rating = '3';
    const result = await facilityService.rateFacility(facilityId, user, rating);
    expect(result).to.equal('facility not found');
  });
  it('should return a string if a booking with a checkin less than today is not found', async () => {
    sinon.reset();
    const facilityId = '5be72db7-5510-4a50-9f15-e23f103116d5';
    const rating = '3';
    const result = await facilityService.rateFacility(facilityId, user, rating);
    expect(result).to.equal('you haven\'t visited this facility yet');
  });
  it('should return an object when the user has visited the facility but haven\'t rated yet', async () => {
    const facilityId = '5be72db7-5510-4a50-9f15-e23f103116d5';
    const rating = '3';
    const result = await facilityService.rateFacility(facilityId, user, rating);
    expect(result.totalRating).to.equal(3);
    expect(result.averageRating).to.equal(3);
  });
  it('should return an object and updated the rating if the user has already rated', async () => {
    const facilityId = '5be72db7-5510-4a50-9f15-e23f103116d5';
    const rating = '4';
    const result = await facilityService.rateFacility(facilityId, user, rating);
    expect(result.totalRating).to.equal(4);
    expect(result.averageRating).to.equal(4);
  });
});
