# Disney Challenge - NodeJS with MySQL (Sequelize)

This is a demo node.js application illustrating various features used in everyday web development, with a fine touch of best practices.

Database - MySQL (Setup local or test instance for development use)
Framework - nodejs (express)

## Getting Setup
Setup nodejs and mysql.

## Requirements
* [NodeJs](https://nodejs.org) >= 8.x 
* [Mysql](https://www.mysql.com/) >= 8.x

**NOTE:**
Connect to mysql and create mysl db `my_Disney_api`.
Set mysql username, password and DB name into env, you can set mysql env variables into config/development.js, config/production.js and config/config.js for db migration.


## Install

```sh
$ git clone https://github.com/Gabean01/Disney-NodeJS-Challenge.git
$ npm install
```
## Run
```sh
$ npm start
```

## Test api with insomnia
Please import `Disney-challenge-insomnia.json ` into your insomnia app
There are 12 apis you can test 

## DB migration with sequelize
```sh
$ npm migrate
```

Thanks
