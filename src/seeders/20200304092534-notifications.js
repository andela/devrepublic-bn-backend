const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Notifications', [
      {
        id: '51j74d57-1910-4f50-9h15-b23740331od5',
        status: 'unread',
        receiverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
        receiverEmail: 'jdev@andela.com',
        content: 'Your trip to Gisenyi on 2020-02-01 has been approved',
        link: `${process.env.BASE_URL}/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld4`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '01q74d57-1995-h45h-592f-b23740331od5',
        status: 'read',
        receiverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
        receiverEmail: 'jdev@andela.com',
        link: `${process.env.BASE_URL}/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld4`,
        content: 'Your trip has been rejected',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '91q74d57-1695-h40h-590f-b25b4063tod5',
        status: 'unread',
        receiverId: '79660e6f-4b7d-4g21-81re-74f54e9e1c8a',
        receiverEmail: 'jeanne@andela.com',
        link: `${process.env.BASE_URL}/api/v1/trips/t1e74db7-h610-4f50-9f45-e2371j331ld4`,
        content: 'Your trip has been rejected',
        createdAt: new Date(),
        updatedAt: new Date(),
      },],
      {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {}),
};
