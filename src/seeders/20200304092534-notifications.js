module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Notifications', [
      {
        id: '51j74d57-1910-4f50-9h15-b23740331od5',
        status: 'unread',
        recieverEmail: 'jdev@andela.com',
        recieverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
        content: 'Your trip to Gisenyi on 2020-02-01 has been approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '01q74d57-1995-h45h-592f-b23740331od5',
        status: 'read',
        recieverEmail: 'jdev@andela.com',
        recieverId: '79660e6f-4b7d-4g21-81re-74f54jk91c8a',
        content: 'You have been assign Jamie Jules as your manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '91q74d57-1695-h40h-590f-b25b4063tod5',
        status: 'unread',
        recieverEmail: 'jeanne@andela.com',
        recieverId: '79660e6f-4b7d-4g21-81re-74f54e9e1c8a',
        content: 'You have been assign Jamie Jules as your manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },],
      {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {}),
};
