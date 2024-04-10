import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";

const getPickingSlips = catchAsync(async (req, res) => {
  res.send({ response: "Hello" });
});

export const pickingSlipsController = {
  getPickingSlips,
};
