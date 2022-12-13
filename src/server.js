'use strict';

require('dotenv').config();
const express = require('express');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const userRouter = require('./routes/users');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

app.use('*', notFound);

app.use(errorHandler);


module.exports = {
  start:(PORT) => app.listen(PORT, console.log('Server started on port:', PORT)),
  app
};