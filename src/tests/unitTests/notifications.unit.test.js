import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models';


const { expect } = chai;
chai.use(chaiHttp);

describe('NOTIFICATION UNIT TESTS', () => {
  it('should return unread notifications of user', async () => {
    const unreadNotifications = await db.Notifications.findAll({
      where: { recieverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a', status: 'unread' }
    });
    expect(unreadNotifications).to.be.an('array');
  });
});
