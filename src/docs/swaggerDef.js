import config from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Hanpoom Shipments Demo API documentation',
    license: {
      name: 'MIT',
      url: 'https://github.com/flamechaoz/shipments',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
