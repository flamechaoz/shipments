import express from 'express';
import pickingSlipsRoute from './picking-slips.route.js';
import docsRoute from '././docs.route.js';
import config from '../../config/config.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/picking-slips',
    route: pickingSlipsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
