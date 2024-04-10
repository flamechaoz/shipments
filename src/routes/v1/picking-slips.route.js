import { pickingSlipsController } from '../../controllers/picking-slips.controller.js';
import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { pickingSlipsValidation } from '../../validations/index.js';

const pickingSlipsRoute = Router();

pickingSlipsRoute
  .route('/')
  .get(validate(pickingSlipsValidation.getPickingSlips), pickingSlipsController.getPickingSlips);

export default pickingSlipsRoute;

/**
 * @swagger
 * tags:
 *   name: Picking Slips
 *   description: Picking Slips and retrieval
 */

/**
 * @swagger
 * /picking-slips/:
 *   get:
 *     summary: Get picking slips
 *     description: Retrieve all picking slips.
 *     tags: [Picking Slips]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of picking slips per page (Min. val. 1)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not printed, printed, held]
 *         description: Picking slip status (eg. "printed")
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Picking Slip'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */