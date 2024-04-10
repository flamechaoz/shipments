import prisma from "../utils/prismaClient.js";
import ApiError from "../utils/ApiError.js";

const getPickingSlips = async (options) => {
    const limit = (options.status == 'printed' || options.status == 'not printed') ? 3 : options.limit;
   
    const pickingSlips = await prisma.pickingSlip.findMany({
        take: limit,
        select: {
            order_id: true,
            id: true,
            picking_slip_dates: {
              select: {
                printed_at: true,
                inspected_at: true,
                shipped_at: true,
                held_at: true,
              }
            },
            picking_slip_items: {
              select: {
                is_pre_order: true,
              }
            }
        }
      
    });

    // restructure result to match expected output
    const pickingSlipsWithStatusAndPreOrderItem = pickingSlips.map(pickingSlip => {

        const printed = pickingSlip.pickingSlipDates?.printed_at !== null &&
                        pickingSlip.pickingSlipDates?.inspected_at === null &&
                        pickingSlip.pickingSlipDates?.shipped_at === null &&
                        pickingSlip.pickingSlipDates?.held_at === null;
        
        const held = pickingSlip.pickingSlipDates?.held_at !== null;
    
        const hasPreOrderItem = pickingSlip.picking_slip_items.some(item => item.is_pre_order === 1);
    
        let pickingSlipStatus;
        if (held) {
          pickingSlipStatus = 'held';
        } else if (printed) {
          pickingSlipStatus = 'printed';
        } else {
          pickingSlipStatus = 'not printed';
        }
    
        return {
          order_id: pickingSlip.order_id,
          picking_slip_id: pickingSlip.id,
          picking_slip_status: pickingSlipStatus,
          has_pre_order_item: hasPreOrderItem,
        };
      });
  
    return pickingSlipsWithStatusAndPreOrderItem;
};

export const pickingSlipService = {
    getPickingSlips
};