import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import ioClient from 'socket.io-client';
import sinon from 'sinon';
import { server } from '../index';
import { provideToken } from '../utils/tokenHandler';

const socketToken = provideToken('79660e6f-4b7d-4g21-81re-74f54jk91c8a', true, 'jdev@andela.com', 'requester');
const socketToken2 = provideToken('0119b84a-99a4-41c0-8a0e-6e0b6c385165', true, 'umuhozad@andela.com', 'manager');

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
let clientSocket;
let clientSocket2;
let clientSocket3;

describe('CHAT TESTS', () => {
  const BASE_URL = `http://localhost:${server.address().port}`;
  beforeEach(() => {
    clientSocket = ioClient.connect(BASE_URL, {
      transportOptions: {
        polling:
            { extraHeaders: { token: socketToken } }
      },
      'force new connection': true,
    });
    clientSocket.on('initialize', () => {
      clientSocket.emit('message', { message: 'this is a message', token: socketToken });
    });

    clientSocket2 = ioClient.connect(BASE_URL, {
      transportOptions: {
        polling:
            { extraHeaders: { token: socketToken2 } }
      },
      'force new connection': true,
    });
    clientSocket2.on('initialize', () => {
      clientSocket2.emit('message', { message: '    ', token: socketToken2 });
    });

    clientSocket3 = ioClient.connect(BASE_URL, {
      transportOptions: {
        polling:
            { extraHeaders: { token: 'safdljasdf' } }
      },
      'force new connection': true,
    });
  });
  afterEach(() => {
    clientSocket.disconnect();
    clientSocket2.disconnect();
    clientSocket3.disconnect();
    sinon.restore();
  });

  it('should receive a chat message', (done) => {
    clientSocket.on('sendMessage', (data) => {
      const result = JSON.parse(data);
      expect(JSON.parse(data)).to.be.an('object');
      expect(result.message).to.equal('this is a message');
      done();
    });
  });
  it('should recieve chat history', (done) => {
    clientSocket.on('chatHistory', (data) => {
      const result = JSON.parse(data);
      expect(result).to.be.an('array');

      done();
    });
  });
  it('should show users that are online', (done) => {
    clientSocket.on('onlineUsers', (data) => {
      const result = JSON.parse(data);
      expect(result).to.be.an('array');
      done();
    });
  });
  it('should return error for invalid token', (done) => {
    clientSocket3.on('initialize', (data) => {
      const result = JSON.parse(data);
      expect(result).to.be.an('object');
      expect(result.error).to.equal('The token is not provided or the token provided is an invalid token');
      done();
    });
  });
  it('should return an error for empty message', (done) => {
    clientSocket2.on('sendMessage', (data) => {
      const result = JSON.parse(data);
      expect(result).to.be.an('object');
      expect(result.message).to.equal('message can\'t be empty or contain only spaces');
      done();
    });
  });
});
