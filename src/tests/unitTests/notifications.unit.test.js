import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import ioClient from 'socket.io-client';
import db from '../../models';
import { server } from '../../index';
import { provideToken } from '../../utils/tokenHandler';

const token = provideToken('79660e6f-4b7d-4g21-81re-74f54jk91c8a', true, 'jdev@andela.com', 'requester');

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);
describe('SOCKET UNIT TESTS', () => {
  let clientSocket;
  const BASE_URL = `http://localhost:${server.address().port}`;

  before((done) => {
    clientSocket = ioClient.connect(BASE_URL, {
      transportOptions: {
        polling:
      { extraHeaders: { token } }
      },
      'force new connection': true,
      forceNew: true,
    });
    done();
  });
  afterEach((done) => {
    clientSocket.disconnect();
    done();
  });
  it('should communicate and notify', (done) => {
    clientSocket.on('initialize', (data) => {
      expect(JSON.parse(data).notif).to.be.an('array');
      expect(JSON.parse(data).notif.length).to.equal(3);
      done();
    });
  });
});

describe('NOTIFICATIONS UNIT TESTS', () => {
  it('should return unread notifications of user', async () => {
    const unreadNotifications = await db.Notifications.findAll({
      where: { receiverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a', status: 'unread' }
    });
    expect(unreadNotifications).to.be.an('array');
  });
});
