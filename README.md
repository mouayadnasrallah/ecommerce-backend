# Ecommerce Backend API

A backend ecommerce system built with:

- NestJS
- TypeScript
- PostgreSQL
- TypeORM

## Features

- User authentication
- Products
- Categories
- Shopping cart
- Orders

## Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- Git
- GitHub

## Installation

```bash
npm install

## Run Project
npm run start:dev

## Environment Variables
create a .env file

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db

# DataBase
## Generate migration
npm run migration:generate

## Run migration
npm run migration:run

## Rollback migration
npm run migratoin:revert

# Project structure
src/
│
├── users/
├── products/
├── categories/
├── carts/
├── orders/
├── database/
└── config/

# Author
Mouayad Nasrallah
Informatics Engineering Student
Damascus University