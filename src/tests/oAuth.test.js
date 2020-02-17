import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import dotenv from 'dotenv';
import authController from '../controllers/authController';
import googleFactory from '../services/factory/googleUser';
// import index from '../index';
// import googleMock from './mocks/googleMock';
// import db from '../models';
// import authController from '../controllers/authController';

const {
  expect
} = chai;

chai.use(chaiHttp);
dotenv.config();


const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  '/api/v1/auth', (req, res, next) => {
    req.user = req.body;
    next();
  }, router.post('/google', authController.oAuthLogin),
  router.post('/facebook', authController.oAuthLogin)
);

const googleUser = googleFactory.build();


describe('Google oAuthentication tests', () => {
  it('should test google authentication signup', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/google')
      .send(googleUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully created');
        done();
      });
  });
  it('should test google authentication login', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/google')
      .send(googleUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User is successfully logged in');
        done();
      });
  });
});
