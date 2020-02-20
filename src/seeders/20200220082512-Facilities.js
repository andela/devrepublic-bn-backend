module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Facilities', [
      {
        id: '5be72db7-5510-4a50-9f15-e23f103116d5',
        facilityName: 'Marriot',
        location: 'Nairobi',
        image: '',
        numOfRooms: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Facilities', null, {}),
};
