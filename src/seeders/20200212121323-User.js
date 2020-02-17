const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: "712cc013-275d-4855-b2ac-77c054ad3d28",
        firstName: 'Bienjee',
        lastName: 'Bieio',
        email: 'jean@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "jbubihyuebucbeceb",
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jdev@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
