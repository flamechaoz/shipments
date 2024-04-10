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
        },
        where: {
            AND: [
              options.status == 'held' ? { picking_slip_dates: { held_at: { not: null } } } :
              options.status == 'printed' ? {
                picking_slip_dates: {
                  printed_at: { not: null },
                  inspected_at: null,
                  shipped_at: null,
                  held_at: null,
                }
              } :
              options.status == 'not printed' ? {
                picking_slip_dates: {
                  printed_at: null,
                  inspected_at: null,
                  shipped_at: null,
                  held_at: null,
                }
              } : {},
            ],
        },
        orderBy: {
            created_at: 'desc' // Sort by created_at from newest to oldest
        }
    });

    console.log(options.status == 'held')

    // restructure result to match expected output
    const pickingSlipsWithStatusAndPreOrderItem = pickingSlips.map(pickingSlip => {

        const printed = pickingSlip.picking_slip_dates?.printed_at !== null &&
                    pickingSlip.picking_slip_dates?.inspected_at === null &&
                    pickingSlip.picking_slip_dates?.shipped_at === null &&
                    pickingSlip.picking_slip_dates?.held_at === null;
        
        // strict checks for undefined is needed
        const held = pickingSlip.picking_slip_dates?.held_at !== null && pickingSlip.picking_slip_dates?.held_at !== undefined;
    
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