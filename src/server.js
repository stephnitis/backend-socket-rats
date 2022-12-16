'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const {auth} = require('express-openid-connect');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const userRouter = require('./routes/users');
const tripsRouter = require('./routes/trips')

const app = express();
const cors = require('cors');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'process.env.SECRET',
  baseURL: 'http://localhost:3000',
  clientID: 'process.env.CLIENT_ID',
  // issuerBaseURL: 'process.env.ISSUER_BASE_URL',
  // tokenSigningAlg: 'HS256'
};

app.use(cors());
app.use(express.json());
app.use(auth(config));

app.use(userRouter);
app.use(tripsRouter);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

// var createToken = require('auth0-api-tokens')({
//   clientId: 'process.env.AUTH0_CLIENT_ID',
//   clientSecret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
// })

// io.use(socketioJwt.authorize({
//   secret: new Buffer(process.env.SECRET, 'base64'),
//   handshake: true
// }));

io.use((socket, next) => {
  //whenever client connects with user...this handshake will hold
  console.log(socket.handshake)
  // if handshake is approved then user can move on
  // if(socket.handshake[]==='' && socket.handshake[]===''){
  //   next();
  // } else {
  //   next(new Error())
  // }
})

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

// app.get('/', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

app.get('/', (req, res, next) => {
  res.status(200).send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
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