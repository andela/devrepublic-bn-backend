module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Bien Aime',
        email: 'jean@andela.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'jean Baraka',
        email: 'baraka@andela.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
