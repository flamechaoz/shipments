import express from 'express';
import pickingSlipsRoute from './picking-slips.route.js';

const routes = express.Router();

const defaultRoutes = [
  {
    path: '/picking-slips',
    route: pickingSlipsRoute,
  },
];

defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

export default routes;
