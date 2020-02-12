const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
// const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
};
function greeter(req, res, next) {
  req.cohort = "Web 26";
  next();
}
// wrute a gatejeeper middleware that reads a possword from req.headers
// if the password is "mellon" let the request continue
// if not send a 400 status code and a message
function auth(req, res, next) {
  if(req.headers.password === 'mellon'){
    next();
  } else {
    console.log(req.headers.password)
    res.status(400).json({ errorMessage: "Incorrect Passowrd" })
  }
}

// global middleware
server.use(express.json()); // built in middleware
server.use(helmet());
server.use(logger);
// server.use(morgan('dev'));


//routes - endpoints
server.use('/api/hubs', hubsRouter);

server.get('/', greeter, auth, (req, res) => {
  // const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
