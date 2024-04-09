/*
  Warnings:

  - You are about to drop the `pickingslip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pickingslipdate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pickingslipitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pickingslipdate` DROP FOREIGN KEY `PickingSlipDate_pickingSlipId_fkey`;

-- DropForeignKey
ALTER TABLE `pickingslipitem` DROP FOREIGN KEY `PickingSlipItem_pickingSlipId_fkey`;

-- DropTable
DROP TABLE `pickingslip`;

-- DropTable
DROP TABLE `pickingslipdate`;

-- DropTable
DROP TABLE `pickingslipitem`;

-- CreateTable
CREATE TABLE `picking_slips` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL,
    `order_fulfillment_order_id` BIGINT NOT NULL,
    `is_contained_single_product` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `picking_slip_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `picking_slip_id` BIGINT NOT NULL,
    `item_id` BIGINT NOT NULL,
    `stock_id` BIGINT NULL,
    `order_fulfillment_product_id` BIGINT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `refunded_quantity` INTEGER NOT NULL DEFAULT 0,
    `location_id` INTEGER NULL,
    `location_code` VARCHAR(30) NULL,
    `is_pre_order` TINYINT NOT NULL DEFAULT 0,
    `is_sales_only` TINYINT NOT NULL DEFAULT 0,
    `pre_order_shipping_at` TIMESTAMP(0) NULL,
    `pre_order_deadline_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `picking_slip_dates` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `picking_slip_id` BIGINT NOT NULL,
    `printed_username` VARCHAR(20) NULL,
    `inspected_username` VARCHAR(20) NULL,
    `packed_username` VARCHAR(20) NULL,
    `shipped_username` VARCHAR(20) NULL,
    `held_username` VARCHAR(20) NULL,
    `cancelled_username` VARCHAR(20) NULL,
    `refunded_username` VARCHAR(20) NULL,
    `confirmed_username` VARCHAR(20) NULL,
    `printed_at` TIMESTAMP(0) NULL,
    `inspected_at` TIMESTAMP(0) NULL,
    `packed_at` TIMESTAMP(0) NULL,
    `shipped_at` TIMESTAMP(0) NULL,
    `delivered_at` TIMESTAMP(0) NULL,
    `returned_at` TIMESTAMP(0) NULL,
    `cancelled_at` TIMESTAMP(0) NULL,
    `refunded_at` TIMESTAMP(0) NULL,
    `held_at` TIMESTAMP(0) NULL,
    `confirmed_at` TIMESTAMP(0) NULL,
    `held_reason` VARCHAR(20) NULL,

    UNIQUE INDEX `picking_slip_dates_picking_slip_id_key`(`picking_slip_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `picking_slip_items` ADD CONSTRAINT `picking_slip_items_picking_slip_id_fkey` FOREIGN KEY (`picking_slip_id`) REFERENCES `picking_slips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `picking_slip_dates` ADD CONSTRAINT `picking_slip_dates_picking_slip_id_fkey` FOREIGN KEY (`picking_slip_id`) REFERENCES `picking_slips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
