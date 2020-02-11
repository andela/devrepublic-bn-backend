[![Build Status](https://travis-ci.org/andela/devrepublic-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/devrepublic-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/andela/devrepublic-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/devrepublic-bn-backend?branch=develop)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-a873d1.svg)](https://houndci.com)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---
Website: https://devrepublic-bn.herokuapp.com/ 
___
## FIRST STEPS TO FOLLOW IN ORDER TO USE OUR ENDPOINTS`

- Clone the repository `https://github.com/andela/devrepublic-bn-backend.git`

- Run `npm Install` in order to install all dependencies

- Run `npm run dev` to start server

## NEXT STEP

- Create `.env` File and Add the following `DEV_DATABASE_URL=postgres://{db_user}:{db_password}@{host}}:{port}/{databaseName}`
  specifiy your `Database username` , `database Password`, `host`, `port` and your created `database name`

## Use the following scripts to create database Tables 

   - Create a model first of all using `sequelize model:generate --name User --attributes firstName:string,email:string,lastName:string,password:string` 
   
   - Then create migration using this command `sequelize db:migrate` in order to be abble to insert data in database
