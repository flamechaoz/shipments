import { pickingSlipsController } from '../../controllers/picking-slips.controller.js';
import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { pickingSlipsValidation } from '../../validations/index.js';

const pickingSlipsRoute = Router();

pickingSlipsRoute
  .route('/')
  .get(validate(pickingSlipsValidation.getPickingSlips), pickingSlipsController.getPickingSlips);

export default pickingSlipsRoute;
