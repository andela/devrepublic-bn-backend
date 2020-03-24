import chai from 'chai';
import db from '../../models';

const {
  expect
} = chai;
const managerId = '0119b84a-99a4-41c0-8a0e-6e0b6c385165';
const managerNoRequest = '75c34027-a2f0-4b50-808e-0c0169fb074c';

describe('STATS UNIT TESTS', () => {
  it('should find all requests details', async () => {
    const requestDetails = await db.Request.findAll({
      where: { managerId }
    });
    expect(requestDetails).to.be.an('array');
    expect(requestDetails.length).to.equal(10);
  });
  it('should return find an error message', async () => {
    const requestDetails = await db.Request.findAll({
      where: { managerId: managerNoRequest }
    });
    expect(requestDetails).to.be.an('array');
    expect(requestDetails.length).to.equal(0);
  });
});
