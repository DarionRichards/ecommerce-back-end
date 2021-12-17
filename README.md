# **E-commerce Back-end** ![MIT](https://img.shields.io/github/license/DarionRichards/ecommerce-back-end?color=teal)

## Table of Contents

### 1. [Description](#introduction)

### 2. [Demo of Application](#demo-of-application)

### 2. [Technologies Used](#technologies-used)

### 3. [Packages Used](#packages-used)

### 4. [User Story](#user-story)

### 4. [User Flow](#user-flow)

### 5. [Getting Started](#getting-started)

### 6. [Tests](#tests)

### 7. [License](#license)

#

## Description

I have been approached to create a **E-Commerce Back End** where I will be configuring a working Express.js API to use Sequelize to interact with a MySQL database.

## Demo of Application

https://watch.screencastify.com/v/FlDQvSqQfRrgC98IzbaE

## Technologies Used

- JavaScript
- Node.js
- SQL

### Packages/Modules Used

- Express
- MySQL2
- Sequelize
- Dotenv

## User Story

```md
AS A manager at an internet retail company

I WANT a back end for my e-commerce website that uses the latest technologies

SO THAT my company can compete with other e-commerce companies
```

## User Flow

```md
GIVEN a functional Express.js API

WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Getting Started

### Install Application

```
git clone git@github.com:DarionRichards/ecommerce-back-end.git
cd ecommerce-back-end
npm i
```

### Seed Database

```
npm run seed
```

### Start Application

```
npm run start
```

## Tests

Tests were not required.

## License

![MIT](https://img.shields.io/github/license/DarionRichards/ecommerce-back-end?color=teal&style=for-the-badge)
