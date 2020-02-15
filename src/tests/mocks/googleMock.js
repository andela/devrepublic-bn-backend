import mocks from 'node-mocks-http';

const response = mocks.createResponse();

const googleMock = {
  response,
  user: {
    id: '112969615845765350889',
    firstName: 'Jim',
    lastName: 'Ntare',
    email: 'jim.ntare@gmail.com',
    method: 'google'
  }
};

export default googleMock;
