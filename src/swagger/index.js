import os from 'os';

// Set up

const swaggerDef = {
  definition: {
    info: {
      title: 'Barefoot Nomad - DevRepublic',
      version: '1.0.0',
      description:
            'A platform to make company global travel and accommodation easy and convenient for strongwork force of savvy member'
    },
    servers: [
      {
        url: 'http://localhost:8000',
        name: `${os.hostname()}`
      },
      {
        url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
        name: `${os.hostname()}`
      }
    ]
  },
  // apis list
  apis: ['../routes/api/*.js']
};

export default swaggerDef;
