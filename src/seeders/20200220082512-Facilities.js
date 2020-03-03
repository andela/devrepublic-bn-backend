module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Facilities', [
      {
        id: '5be72db7-5510-4a50-9f15-e23f103116d5',
        facilityName: 'Marriot',
        location: 'Nairobi',
        image: '',
        numOfRooms: 0,
        createdBy: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5bb72db7-5514-4a50-9g15-e23f103116d3',
        facilityName: 'Serena',
        location: 'Kigali',
        image: '',
        numOfRooms: 0,
        createdBy: '0119b84a-99a4-41c0-8a0e-6e0b6c385165',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Facilities', null, {}),
};
