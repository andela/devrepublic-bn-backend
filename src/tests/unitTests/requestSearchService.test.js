import chai from 'chai';
import TripsService from '../../services/tripServices';

const {
  expect
} = chai;
describe('SEARCH SERVICE TESTS', () => {
  const user = {
    id: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
    email: 'jdev@andela.com',
    role: 'requester',
    managerId: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
  };
  let field;
  it('should return request not found if the request doesn\'t exist', async () => {
    field = {
      id: 'what'
    };
    const requests = await TripsService.searchRequest(field, user);
    expect(requests).to.equal('request not found');
  });
  it('should return an array of requests found on search', async () => {
    field = {
      id: 't1e74db7-h610-4f50-9f45-e2371j331ld5'
    };
    const requests = await TripsService.searchRequest(field, user);
    expect(requests).to.be.an('array');
    expect(requests[0].dataValues.managerId).to.equal('75c34027-a2f0-4b50-808e-0c0169fb074w');
    expect(requests[0].dataValues.id).to.equal('t1e74db7-h610-4f50-9f45-e2371j331ld5');
  });
});
