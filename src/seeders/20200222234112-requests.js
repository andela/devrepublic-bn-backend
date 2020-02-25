module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Requests', [
      {
        id: '51e74db7-5510-4f50-9f15-e23710331ld5',
        location: 'Nairobi',
        destination: 'Kigali',
        reason: 'meeting with partners',
        accomodation: 'Virunga-12',
        departureDate: '2020-01-01',
        email: 'jeanne@andela.com',
        status: 'Open',
        returnDate: '2020-02-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 't1e74db7-h610-4f50-9f45-e2371j331ld5',
        location: 'Boston',
        destination: 'Kigali',
        reason: 'meeting with engineers',
        accomodation: 'Marriot',
        departureDate: '2020-12-01',
        email: 'jdev@andela.com',
        status: 'Rejected',
        returnDate: '2021-02-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], 
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Requests', null, {}),
};
