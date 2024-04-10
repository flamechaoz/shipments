# RESTful API Node Server for Hanpoom Shipments Demo

This is the backend server for the Shipments Challenge by Hanpoom

## Quick Start
Make sure to have yarn installed on your machine.
Install the dependencies:
```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

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

TO DO

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
