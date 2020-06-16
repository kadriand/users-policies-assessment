<h1 align="center">
 users-policies-assessment
</h1>

> Policies API built with Express.js

## Requirements

* [Yarn](https://docs.docker.com/compose/) 
* [Nodemon](https://www.npmjs.com/package/nodemon/v/1.17.3) 
* flow


    $ npm install --global flow-bin

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone https://github.com/kadriand/users-policies-assessment
    $ npm install -g nodemon
    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.
