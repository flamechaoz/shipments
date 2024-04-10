import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import pick from "../utils/pick.js";
import { pickingSlipService } from "../services/picking-slip.service.js";

const getPickingSlips = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'status']);
  const result = await pickingSlipService.getPickingSlips(options);
  res.send(result);
});

export const pickingSlipsController = {
  getPickingSlips,
};
