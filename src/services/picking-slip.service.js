import prisma from "../utils/prismaClient.js";
import ApiError from "../utils/ApiError.js";

const getPickingSlips = async (options) => {
    const { limit, status } = options;
    const pickingSlips = await prisma.pickingSlip.findMany({
        take: limit,
    });
  
    return pickingSlips;
};

export const pickingSlipService = {
    getPickingSlips
};