'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
// const { auth } = require('express-openid-connect');
const { auth } = require('express-oauth2-jwt-bearer');
var { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const userRouter = require('./routes/users');
const tripsRouter = require('./routes/trips')

const app = express();
const cors = require('cors');

// const config = {
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   secret: process.env.SESSION_SECRET,
//   authRequired: false,
//   auth0Logout: true,
//   audience: 'http://localhost:3002/',
//   tokenSigningAlg: 'RS256'
// };

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URI
}),
audience: process.env.BASE_URL,
issuer: process.env.AUTH0_ISSUER_BASE_URL,
algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
res.send('Secured Resource');
});

app.use(cors());
app.use(express.json());
// app.use(auth(config));

app.use(userRouter);
app.use(tripsRouter);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST'],
  }
});

//dispatch will need access to multiple rooms
//private response?
//manage a dispatch board that handles the multitude of requests
io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on('join', (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} ${data}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    // console.log('User Disconnected', socket.id);
  });
});

// app.get('/', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// app.get('/', (req, res, next) => {
//   res.status(200).send(req.oidc.isAuthenticated() ? `hello ${req.oidc.user.name}` : 'Logged out');
// });

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

// app.get('/sign-up', (req, res) => {
//   res.oidc.login({
//     authorizationParams: {
//       screen_hint: 'signup',
//     },
//   });
// });

app.use('*', notFound);

app.use(errorHandler);


module.exports = {
  start:(PORT) => server.listen(PORT, console.log('Server started on port:', PORT)),
  app
};