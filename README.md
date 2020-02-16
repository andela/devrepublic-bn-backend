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
Connect the project to Postgres Database by creating .env file and the following

```
`DEV_DATABASE_URL=postgres://{db_username}:{db_password}@{host}}:{port}/{databaseName}`

```
specifiy your `database username` , `database Password`, `host`, `port` and your created `database name`

```
Create migration using this command `sequelize db:migrate` in order to be abble to insert data in database
```

## Running the tests
In your terminal
```
Run npm test
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
