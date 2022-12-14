const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cook Book API',
    description: 'Here you can find some greate recipes',
  },
  host: 'ipulotu-cookbook.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);