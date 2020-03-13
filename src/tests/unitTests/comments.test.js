import chai from 'chai';
import uuid from 'uuid/v4';
import db from '../../models';

const {
  expect
} = chai;
const requestId = '51e74db7-5510-4f50-9f15-e23710331ld5';
describe('COMMENT UNIT TESTS', () => {
  it('should find a request', async () => {
    const requestDetails = await db.Request.findOne({
      where: { id: requestId }
    });
    expect(requestDetails).to.be.an('object');
    expect(requestDetails.id).to.equal('51e74db7-5510-4f50-9f15-e23710331ld5');
    expect(requestDetails.managerId).to.equal('0119b84a-99a4-41c0-8a0e-6e0b6c385165');
  });
  it('should create a comment', async () => {
    const newComment = await db.Comments.create({
      requestId,
      id: uuid(),
      commentOwner: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
      comment: 'As a your manager I can add any comment on your request. I can also cancel or approve your request but let me comment first'
    });
    expect(newComment).to.be.an('object');
    expect(newComment.comment).to.equal('As a your manager I can add any comment on your request. I can also cancel or approve your request but let me comment first');
  });
});
