import chai from 'chai';
import db from '../../models';

const {
  expect
} = chai;
describe('REQUEST MODEL TEST', () => {
  describe('FINDALL REQUEST', () => {
    it('should return error if the property used for findAll isn\'t in the model', async () => {
      try {
        await db.Request.findAll({
          where: {
            ids: '123rfsf23-4rfw-34r23412412rg'
          }
        });
      } catch (err) {
        expect(err.message).to.equal('column Request.ids does not exist');
      }
    });
    it('should return error if the property use for find isn\'t in the model', async () => {
      const requests = await db.Request.findAll({
        where: {
          id: '123rfsf23-4rfw-34r23412412rg'
        }
      });
      expect(requests).to.be.an('array');
      expect(requests.length).to.equal(0);
    });
  });
});
