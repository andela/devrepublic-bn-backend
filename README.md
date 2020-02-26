[![Build Status](https://travis-ci.org/andela/devrepublic-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/devrepublic-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/andela/devrepublic-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/devrepublic-bn-backend?branch=develop)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-a873d1.svg)](https://houndci.com)

# Barefoot Nomad

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.


## Getting Started

The instructions below will get you a copy of the project up and running on your local machine for development, further contribution and testing purposes. 

### Prerequisites

Software to have locally on your computer for you to run this project

```
Install Postgres Database
```
```
Install NodeJs
```


### Installing

Clone the repository

```
git clone https://github.com/andela/devrepublic-bn-backend.git
```

Install all the project's dependencies

```
Run npm install
```
### Set up environment variable

- create a `.env` file in the root directory

- copy the variable from the `env.example` into the `.env` and give them values

### Set up database

create development database and test database

Connect the project to Postgres development database by adding the db into .env file

`DEV_DATABASE_URL=postgres://{db_username}:{db_password}@{host}}:{port}/{databaseName}`

Connect the project to Postgres test database by adding the db url into the .env file

`TEST_DATABASE_URL=postgres://{db_username}:{db_password}@{host}}:{port}/{testDatabaseName}`

specifiy your `database username` , `database Password`, `host`, `port` and your created `database name`

run the following script in order to create migration

```
npm run create
```
To undo migrations run the following script

```
npm run drop
```
to seed data into the database run the following script

```
npm run seed:dev
```

To run all the above scripts all together and start the server at the same time
this script will do it together

```
npm run reset:dev
```
## Running the tests
In your terminal
```
Run npm test
```
## Running the build
In your terminal
```
npm run build
```
## Start server
In your terminal
```
npm run dev
```
## Built With

* [Express](https://expressjs.com/) - The backend framework used
* [Postgres](https://www.postgresql.org/) - The database service used

## Authors

* **Jim Ntare** - [Ntare22](https://github.com/Ntare22)
* **Jean Bien-Aime Byiringiro** - [bbaime98](https://github.com/bbaime98)
* **Jean Pierre Baraka Mugisha** - [Baraka-Mugisha](https://github.com/Baraka-Mugisha)
* **Izzedin Serge Ishimwe** - [izzett222](https://github.com/izzett222)

## Acknowledgments

* Andela Simulations Program
* Samuel Nishimwe
* Caroline Nkirote
* Samuel Munyili

---
Website: https://devrepublic-bn.herokuapp.com/api/

