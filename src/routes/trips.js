'use strict';

const express = require('express');

require('dotenv').config();
const tripsRouter = express.Router();
const { requiresAuth } = require('express-openid-connect');
const prisma = require('../prisma/prisma.js');

// tripsRouter.get('/trips', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

tripsRouter.get('/trips', (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


tripsRouter.post('/trips', async (req, res) => {
  try {
    const {trailName, startTime, returnTime, userId} = req.body;
    const newTrip = await prisma.Trip.create({
      data: {
          trailName: trailName,
          startTime: startTime,
          returnTime: returnTime,
          hiker: {
            connect: { id: userId },
          },
      }
    });
    res.status(200).json({newTrip});
  } catch (e) {
    console.log(e);
  }
});

tripsRouter.get('/trips', async (req, res) => {
  try {
    const allTrips = await prisma.trip.findMany();
    let result = {
      data: {
        results: allTrips,
      }
    }
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
});

tripsRouter.put('/trips/:id', async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).json(trip);
  } catch(e) {
    console.log(e);
  }
});

tripsRouter.put('/trips/:id', async (req, res) => {
  try {
    const updatedTrip = await prisma.trip.update({
      where: {
        id: String(req.params.id),
      },
      data: {
        coordinates: req.body.coordinates || undefined,
        trailName: req.body.trailName || undefined,
        startTime: req.body.startTime || undefined,
        returnTime: req.body.returnTime || undefined,
        routeDetails: req.body.routeDetails || undefined,
      }
    })
    res.json(updatedTrip);
  } catch (e) {
    console.log(e);
  }
})

tripsRouter.delete('/trips/:id', async (req, res) => {
  try {
    await prisma.trip.delete({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).send('trip deleted');
  } catch (e) {
    console.log(e);
  }
})

module.exports = tripsRouter;