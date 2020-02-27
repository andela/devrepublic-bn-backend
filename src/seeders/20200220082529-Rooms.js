const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Rooms', [
      {
        id: 'e5e3373e-757b-4dc0-9c55-867c35eef374',
        facilityId: '5be72db7-5510-4a50-9f15-e23f103116d5',
        roomName: 'Accra 1',
        type: 'King-size',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {},
  ),
  
  down: (queryInterface) => queryInterface.bulkDelete('Rooms', null, {}),
};
