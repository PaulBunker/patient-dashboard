# Patient Dashboard

This is a full-stack web application that lists patients belonging to a specific clinic, and allows users to sort the list by any field.

## Technologies Used

- Create React App: a tool for quickly setting up a React development environment, used to save time during development. Note that this approach may not be suitable for a real production app, and a different method may be used instead.
- TypeScript
- React
- Node.js
- Apollo Client: a state management library for JavaScript applications, used to fetch data from the backend
- Apollo Server: a GraphQL server library for Node.js, used to serve data to the frontend
- CSV Parse: a library for parsing CSV files
- Jest: a JavaScript testing framework used for unit testing.
- Testing Library: a library for testing React components.

## Installation for Development

To install and run the project in a development environment, follow these steps:

1. Clone the repository by running the following command:

   ```
   git clone https://github.com/PaulBunker/patient-dashboard.git
   ```

2. If you're using `nvm` to manage your Node.js versions, switch to the required version of Node.js by running the following command:

   ```
   nvm use 18.16.0
   ```

   If you're not using `nvm`, make sure to install Node.js version 18.16.0

3. Install the project dependencies by running the following command:

   ```
   npm install
   ```

4. To start the backend, run the following command:

   ```
   npm run server-start
   ```

   This will start the Apollo Server and serve the Clinic and Patient data in a GraphQL API.

5. To start the frontend, run the following command:

   ```
   npm start
   ```

   This will start the React development server and open the application in a web browser.

6. To run the unit tests, use the following command:

   ```
   npm test
   ```

   Note: The tests require at least Node.js version 18.16.0 to run. If you're using an older version of Node.js, the tests will not run. We recommend using at least the latest LTS (Long-term Support) version of Node.js to ensure compatibility with the project. (I know I keep banging on about it but it caused me problems so I need to make sure you don't miss this)

### Notes

- The project requires at least Node.js version 18.16.0 to run. If you're using an older version of Node.js, the project and tests may not work as expected.
- Given more time I would separate the back end and front end more but I still like monorepo style architecture. Simply moving things into folders started causing problems and I decided my time was better spent in the code.
- Not enough component tests but I'm out of time, I think you should have a flavour of my style though.
- There's a couple of TODO's in the code for you to find.
- The table sometimes flashes, I would possibly investigate leaving the data in the table and having a loading overlay to prevent the screen from jolting about. 
