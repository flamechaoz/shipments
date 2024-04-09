import { version } from '../../package.json';
import { port } from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Hanpoom Shipments Demo API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/flamechaoz/shipments',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
    },
  ],
};

export default swaggerDef;
