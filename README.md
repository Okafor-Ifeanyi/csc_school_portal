# CSC-PORTAL
This repository contains the backend functionalities of a Portal Management Software. The software is efficiently designed to streamline communication and information sharing between students, teachers, and administrators.

 ## Tech Stack
- Node js
- Typescript
- Express
- Mongoose
- dotenv
- Joi
- Jsonwebtoken
- Jest
- SuperTest
- Bcrypt
- Morgan
- Passport

## Installation
- Clone the [repo](https://github.com/Okafor-Ifeanyi/csc_school_portal.git) 
``` js
- Run `npm install ` in your terminal to install packages in package.json
- Create a `.env file` and fill in values for the following variables: - `DATABASE_URI`
- Finally run `npm start` in your terminal
```
## Endpoints 
- Healthcheck: `/api/healthcheck` 
    [ `GET`: Server Health Check ]

 - `admins: `
    [ `POST`: Register a new staff]  `/api/admins/register`
    [ `POST`: Login a staff]  `/api/admins/login`
    [ `GET`: get all staffs] `/api/admins`
    [ `GET`: get a single staff] `/api/admins/<id>`
    [ `PATCH`: update a staff] `/api/admins/update`
    [ `DELETE`: delete a staff] `/api/admins/delete`

 - `classes: `
    [ `POST`: Create a new class]  `/api/classes/register`
    [ `GET`: get all classes] `/api/classes`
    [ `GET`: get a single class] `/api/classes/<id>`
    [ `PATCH`: update a class] `/api/classes/update/<id>`
    [ `DELETE`: delete a class] `/api/classes/delete/<id>`

- `students: `
    [ `POST`: Register a new student]  `/api/students/register`
    [ `POST`: Login a student]  `/api/students/login`
    [ `POST`: Upload a student]  `/api/students/upload`
    [ `GET`: get all students] `/api/students`
    [ `GET`: get a single student] `/api/students/<id>`
    [ `PATCH`: update a student] `/api/students/update`
    [ `DELETE`: delete a student] `/api/students/delete`



- [API Documentation](https://documenter.getpostman.com/view/26151840/2s93JtQixJ) `/api/docs` [ `GET`: get API Documentation] 
## Entity Relationship model
To view the Entity Relationship Diagram (ERM) navigate [here](https://github.com/Okafor-Ifeanyi/csc_school_portal/blob/c2c0e0da14eddb6630860032c127b544e2d90622/ERM/CSC%20School%20Portal.pdf)

> Copyright (c) 2023 