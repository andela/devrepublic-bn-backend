import chai from 'chai';
import { provideToken, verifyToken } from '../utils/tokenHandler';

const {
  expect
} = chai;
const token = provideToken('dewdwwdwd', false, 'ade@gmail.com');
describe('verify token', () => {
  it('should return an object', () => {
    expect(verifyToken(token)).to.be.an('object');
    expect(verifyToken(token)).to.have.property('id', 'dewdwwdwd');
    expect(verifyToken(token)).to.have.property('isVerified', false);
  });
});
