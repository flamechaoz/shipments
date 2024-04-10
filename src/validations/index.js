import Joi from 'joi';

const getPickingSlips = {
  params: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string().valid('not printed', 'printed ', 'held'),
  }),
};

export const pickingSlipsValidation = {
  getPickingSlips
};
