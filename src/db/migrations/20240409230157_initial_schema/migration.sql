-- CreateTable
CREATE TABLE `PickingSlip` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `orderId` BIGINT NOT NULL,
    `orderFulfillmentOrderId` BIGINT NOT NULL,
    `isContainedSingleProduct` TINYINT NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PickingSlipItem` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pickingSlipId` BIGINT NOT NULL,
    `itemId` BIGINT NOT NULL,
    `stockId` BIGINT NULL,
    `orderFulfillmentProductId` BIGINT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `refundedQuantity` INTEGER NOT NULL DEFAULT 0,
    `locationId` INTEGER NULL,
    `locationCode` VARCHAR(30) NULL,
    `isPreOrder` TINYINT NOT NULL DEFAULT 0,
    `isSalesOnly` TINYINT NOT NULL DEFAULT 0,
    `preOrderShippingAt` TIMESTAMP(0) NULL,
    `preDeadline` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PickingSlipDate` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pickingSlipId` BIGINT NOT NULL,
    `printedUsername` VARCHAR(20) NULL,
    `inspectedUsername` VARCHAR(20) NULL,
    `packedUsername` VARCHAR(20) NULL,
    `shippedUsername` VARCHAR(20) NULL,
    `heldUsername` VARCHAR(20) NULL,
    `cancelledUsername` VARCHAR(20) NULL,
    `refundedUsername` VARCHAR(20) NULL,
    `confirmedUsername` VARCHAR(20) NULL,
    `printedAt` TIMESTAMP(0) NULL,
    `inspectedAt` TIMESTAMP(0) NULL,
    `packedAt` TIMESTAMP(0) NULL,
    `shippedAt` TIMESTAMP(0) NULL,
    `deliveredAt` TIMESTAMP(0) NULL,
    `returnedAt` TIMESTAMP(0) NULL,
    `cancelledAt` TIMESTAMP(0) NULL,
    `refundedAt` TIMESTAMP(0) NULL,
    `heldAt` TIMESTAMP(0) NULL,
    `confirmedAt` TIMESTAMP(0) NULL,
    `heldReason` VARCHAR(20) NULL,

    UNIQUE INDEX `PickingSlipDate_pickingSlipId_key`(`pickingSlipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PickingSlipItem` ADD CONSTRAINT `PickingSlipItem_pickingSlipId_fkey` FOREIGN KEY (`pickingSlipId`) REFERENCES `PickingSlip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PickingSlipDate` ADD CONSTRAINT `PickingSlipDate_pickingSlipId_fkey` FOREIGN KEY (`pickingSlipId`) REFERENCES `PickingSlip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
