# RESTful API Node Server for Hanpoom Shipments Demo

This is the backend server for the Shipments Challenge by Hanpoom

## Quick Start
Make sure to have yarn installed on your machine.
Install the dependencies:
```bash
yarn install
```

Have an empty MySQL database ready. 

Set the environment variables by running the code below in a terminal:

```bash
cp .env.example .env
```

Open .env and modify the environment variables to point to your database.
```
DATABASE_URL='mysql://<user>:<pass>@<host>:3306/<db_name>'
```

Next, spin up a dev environment with the command:
```
yarn dev
```

You may follow the link `http://localhost:3000/v1/docs` to view this project's endpoints.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Structure](#database-structure)
- [Environment Variables](#environment-variables)
- [Commands](#commands)
- [Validation](#validation)

## Features

- **MySQL database**: [MySQL](https://www.mysql.com/) with object data modeling using [Prisma](https://www.prisma.io/)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [Yarn](https://yarnpkg.com)

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--db\             # Prisma files (migrations and schema)
 |--docs\           # Swagger definitions and object schemas
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

## Database Structure

The database is structured as the image below

![Shipments ERD](https://github.com/flamechaoz/shipments/blob/main/src/assets/img/shipments_erd.png?raw=true)

The Prisma equivalent:
`picking_slips`
```javascript
model PickingSlip {
  id                            BigInt @id @default(autoincrement()) @db.BigInt()
  order_id                      BigInt @db.BigInt() @map("order_id")
  order_fulfillment_order_id    BigInt @db.BigInt() @map("order_fulfillment_order_id")
  is_contained_single_product   Int @default(0) @db.TinyInt() @map("is_contained_single_product")
  created_at                    DateTime @default(now()) @db.Timestamp(0) @map("created_at")
  picking_slip_items            PickingSlipItem[]
  picking_slip_dates            PickingSlipDate?

  @@map("picking_slips")
}
```

`picking_slip_items`
```javascript
model PickingSlipItem {
  id                        BigInt @id @default(autoincrement()) @db.BigInt()
  picking_slip_id             BigInt @db.BigInt() @map("picking_slip_id")
  item_id                    BigInt @db.BigInt() @map("item_id")
  stock_id                   BigInt? @db.BigInt() @map("stock_id")
  order_fulfillment_product_id BigInt @db.BigInt() @map("order_fulfillment_product_id")
  quantity                  Int @db.Int() @map("quantity")
  refunded_quantity          Int @default(0) @db.Int() @map("refunded_quantity")
  location_id                Int? @db.Int() @map("location_id")
  location_code              String? @db.VarChar(30) @map("location_code")
  is_pre_order                Int @default(0) @db.TinyInt() @map("is_pre_order")
  is_sales_only               Int @default(0) @db.TinyInt() @map("is_sales_only")
  pre_order_shipping_at        DateTime? @db.Timestamp(0) @map("pre_order_shipping_at")
  pre_order_deadline_at        DateTime? @db.Timestamp(0) @map("pre_order_deadline_at")
  created_at                 DateTime @default(now()) @db.Timestamp(0) @map("created_at")
  updated_at                 DateTime @default(now()) @db.Timestamp(0) @updatedAt @map("updated_at")
  picking_lip               PickingSlip @relation(fields: [picking_slip_id], references: [id])

  @@map("picking_slip_items")
}
```

`picking_slip_dates`
```javascript
model PickingSlipDate {
  id                  BigInt @id @default(autoincrement()) @db.BigInt()
  picking_slip_id       BigInt @db.BigInt() @unique @map("picking_slip_id")
  printed_username     String? @db.VarChar(20) @map("printed_username")
  inspected_username   String? @db.VarChar(20) @map("inspected_username")
  packed_username      String? @db.VarChar(20) @map("packed_username")
  shipped_username     String? @db.VarChar(20) @map("shipped_username")
  held_username        String? @db.VarChar(20) @map("held_username")
  cancelled_username   String? @db.VarChar(20) @map("cancelled_username")
  refunded_username    String? @db.VarChar(20) @map("refunded_username")
  confirmed_username   String? @db.VarChar(20) @map("confirmed_username")
  printed_at           DateTime? @db.Timestamp(0) @map("printed_at")
  inspected_at         DateTime? @db.Timestamp(0) @map("inspected_at")
  packed_at            DateTime? @db.Timestamp(0) @map("packed_at")
  shipped_at           DateTime? @db.Timestamp(0) @map("shipped_at")
  delivered_at         DateTime? @db.Timestamp(0) @map("delivered_at")
  returned_at          DateTime? @db.Timestamp(0) @map("returned_at")
  cancelled_at         DateTime? @db.Timestamp(0) @map("cancelled_at")
  refunded_at          DateTime? @db.Timestamp(0) @map("refunded_at")
  held_at              DateTime? @db.Timestamp(0) @map("held_at")
  confirmed_at         DateTime? @db.Timestamp(0) @map("confirmed_at")
  held_reason          String? @db.VarChar(20) @map("held_reason")
  picking_slip         PickingSlip @relation(fields: [picking_slip_id], references: [id])

  @@map("picking_slip_dates")
}
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Database
DATABASE='shipments'
USERNAME='root'
HOST='localhost'
PASSWORD=''
DATABASE_URL='mysql://root:@localhost:3306/shipments'
SHADOW_DATABASE_URL=''

# Port number
PORT=3000

```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
import { pickingSlipsController } from '../../controllers/picking-slips.controller.js';
import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { pickingSlipsValidation } from '../../validations/index.js';

const pickingSlipsRoute = Router();

pickingSlipsRoute
  .route('/')
  .get(validate(pickingSlipsValidation.getPickingSlips), pickingSlipsController.getPickingSlips);

export default pickingSlipsRoute;
```
