# Inventory App
[Live Demo](https://inventory-app-production-f098.up.railway.app/)

## Description
A CRUD inventory app with items and categories.

## Features
- Error handling with Express Validator
- Admin password for update and delete operations using dotenv
- Mongoose to create models, schemas, and store data in MongoDB
- Express routes and middlewares
- Multer to upload files
- EJS template engine

## Lessons Learned
- You cannot remove a field by setting its value to undefined in Mongoose/MongoDB; you need to use the $unset operator.
