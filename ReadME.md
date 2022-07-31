# Marina boat slip monitoring system

A project by cyber range virginia for marina Boat Slip Monitoring system.


## Run Locally

Clone the project

```bash
  git clone https://github.com/venkateshellaboina/cyberrange-va
```

Go to the project directory

```bash
  cd cyberrange-va
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Running Tests

To run tests, run the following command

```bash
  npm test
```


## Tech Stack

**Server:** Node.js, Express, lowdb, Jest, Supertest

## About the project
#### API Structure
This service provides 3 API calls to interact with the Boat slip monitoring system.

**GET /boat-slips**
This API call returns the current status of the 3 boat slips.

**POST /boat-slips**
This API call allows updating a vacant boat slip with the provided vessel name.

**PUT /bost-slips/{slip-number}/vacate**
This API calls allows vacating the boat slip of the provided slip number.


The service is set to run on the 8080 port by default and API calls are defined in the app.js file. 
To change the port number, create a .env file in the main directory and give your custom port number(PORT = 'Your Port Number')

#### File Description
- The starting point of the server is index.js in the main directory.
- The APIs are defined in app.js.
- The file util.js is used to write reusable functions.
- All the constants are written in constants.js file in the constants folder.
- lowdb setup is defined in setup.js file under database folder.
- Tests are written in app.test.js under tests folder.

#### Code Flow
Express library is used to handle REST API requests. 
On app initialization, lowdb database is used to set the data to initial boat slips values. 
[lowdb](https://www.npmjs.com/package/lowdb), is a library which supports writing and reading JSON data without an actual database.It is much easier to setup and is faster in query.

The data is read from a JSON file(database.json) and is written to the same file(database.json) when any changes are made in the JSON data.

As tests shouldn't alter any of the actual data, a seperate JSON file database.test.json is used for all test data interactions.
Tests are written for each individual API to test the response status codes and the payload structure. To transform jest code to support ES6 modules, babel is configured for jest in .babelrc file. 


## Authors

- [Venkatesh Ellaboina](https://www.github.com/venkateshellaboina)
