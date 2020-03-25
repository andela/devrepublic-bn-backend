import chai from 'chai';
import sgMail from '@sendgrid/mail';
import sinon from 'sinon';
import TripsService from '../../services/tripServices';
import stringHelper from '../../utils/stringHelper';
import db from '../../models';

const {
  expect
} = chai;
const managerId = '0119b84a-99a4-41c0-8a0e-6e0b6c385165';
const requestId = 'f88ed93c-b84d-4159-85e0-221cd7b2f547';
describe('SEARCH REQUEST SERVICE TESTS', () => {
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
    expect(requests[0].dataValues.managerId).to.equal('0119b84a-99a4-41c0-8a0e-6e0b6c385165');
    expect(requests[0].dataValues.id).to.equal('t1e74db7-h610-4f50-9f45-e2371j331ld5');
  });
});
describe('APPROVE REQUEST SERVICE TEST', () => {
  beforeEach(() => {
    sinon.stub(sgMail, 'send').resolves({
      to: 'aime@amgil.com',
      from: 'devrepublic.team@gmail.com',
      subject: 'barefoot nomad',
      html: 'this is stubbing message'
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should return an error message when the request is not found', async () => {
    const approvedRequest = await TripsService.approveRequest('345523cfe', managerId);
    expect(approvedRequest).to.equal(stringHelper.approveRequestNotFound);
  });
  it('should return the updated request', async () => {
    const approvedRequest = await TripsService.approveRequest(requestId, managerId);
    expect(approvedRequest).to.be.an('object');
    expect(approvedRequest.id).to.equal('f88ed93c-b84d-4159-85e0-221cd7b2f547');
    expect(approvedRequest.managerId).to.equal('0119b84a-99a4-41c0-8a0e-6e0b6c385165');

    expect(approvedRequest.status).to.equal('approved');
  });
});
describe('MOST TRAVELLED DESTINATION UNIT TEST', () => {
  it('should return the most travelled destinations', async () => {
    const counting = await db.Request.findAll({
      attributes: ['destination', [db.sequelize.fn('count', db.sequelize.col('destination')), 'count']],
      group: ['Request.destination'],
      raw: true,
      order: db.sequelize.literal('count DESC'),
      where: {
        status: 'approved',
        confirm: true
      }
    });
    expect(counting).to.be.an('array');
  });
});
