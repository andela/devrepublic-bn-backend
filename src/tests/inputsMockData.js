const validInputs = [
  {
    firstName: 'bienaime',
    lastName: 'jeanb',
    email: 'aime@andela.com',
    password: 'Aime12&*'
  }
];

const invalidInputs = [
  {
    firstName: 'bienaime',
    lastName: 'j',
    email: 'aime@andela.com',
    password: 'Baime12345$@'
  }
];


export { validInputs, invalidInputs };
