import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';

const {
  expect
} = chai;

let managerToken, noReqManagerToken;
const requestId = '0ad0ef9d-a926-4c5c-86e6-4d1e22e9ab88';
const managerId = '79660e6f-4b7d-4d21-81ad-74f64e9e1c8a';

chai.use(chaiHttp);

describe('REJECT REQUEST TESTS', () => {
  it('should login a manger who will reject request', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jules@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        managerToken = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should login a manger who does not have a request to reject', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'ishimwe@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        noReqManagerToken = res.body.data;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not allow manager to reject a request successfully if the request does not belongs to that manager', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${requestId}/reject`)
      .set('token', noReqManagerToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('This request is not yours it is for another manager');
        done();
      });
  });
  it('should find a request', async () => {
    const findRequest = await db.Request.findOne({
      where: { id: requestId }
    });
    expect(findRequest).to.be.an('object');
    expect(findRequest.id).to.equal('0ad0ef9d-a926-4c5c-86e6-4d1e22e9ab88');
    expect(findRequest.managerId).to.equal('79660e6f-4b7d-4d21-81ad-74f64e9e1c8a');
    expect(findRequest.status).to.equal('open');
  });
  it('should allow manager to reject a request successfully if the request belongs to that manager', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${requestId}/reject`)
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Request rejected successfully');
        done();
      });
  });
  it('should update a request from open to rejected', async () => {
    const requestFound = await db.Request.update({
      status: 'rejected'
    }, {
      where: {
        id: requestId,
        managerId
      },
      returning: true,
      plain: true
    });
    expect(requestFound[1]).to.be.an('object');
    expect(requestFound[1].status).to.equal('rejected');
    expect(requestFound[1].id).to.equal('0ad0ef9d-a926-4c5c-86e6-4d1e22e9ab88');
    expect(requestFound[1].managerId).to.equal('79660e6f-4b7d-4d21-81ad-74f64e9e1c8a');
  });
});
