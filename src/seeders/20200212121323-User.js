const bcrypt = require('bcrypt')
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      // {
      //   id: 'd0651d02-46e6-4b70-9c3b-8d378c178241',
      //   firstName: 'bienaime',
      //   lastName: 'jeanb',
      //   email: 'aime@andela.com',
      //   password: bcrypt.hashSync('Aime12&*', Number(process.env.passwordHashSalt)),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        id: "d0551d02-46e6-4b79-9c3b-8d378c178243",
        firstName: 'Bienjee',
        lastName: 'Bieio',
        email: 'jean@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'super administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d0651d03-46e6-4b70-9c3b-8d3785178241",
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jdev@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        firstName: 'devrepubli',
        lastName: 'devrpo',
        email: 'jeanne@andela.com',
        password: bcrypt.hashSync('Bien@BAR789', Number(process.env.passwordHashSalt)),
        isVerified: false,
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
