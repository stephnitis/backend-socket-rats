'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const userRouter = require('./routes/users');
const tripsRouter = require('./routes/trips')

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(tripsRouter);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

//dispatch will need access to multiple rooms
//private response?
//manage a dispatch board that handles the multitude of requests
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} ${data}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

app.use('*', notFound);

app.use(errorHandler);


module.exports = {
  start:(PORT) => server.listen(PORT, console.log('Server started on port:', PORT)),
  app
};