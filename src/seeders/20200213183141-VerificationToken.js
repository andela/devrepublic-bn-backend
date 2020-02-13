  
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'VerificationTokens',
    [
      {
        userId: '712cc013-275d-4855-b2ac-77c054ad3d28',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxMmNjMDEzLTI3NWQtNDg1NS1iMmFjLTc3YzA1NGFkM2QyOCIsImlzVmVyaWZpZWQiOmZhbHNlfQ.MlLRqH_BSv4mixIUTbYlg1-7juTvkR20YkcYctG_vnI',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('VerificationTokens', null, {}),
};
