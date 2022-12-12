'use strict';

const express = require('express');
const PORT = process.env.PORT || 3002;
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('listening on port', PORT));
}

module.exports = {app, start};