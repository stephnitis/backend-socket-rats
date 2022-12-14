'use strict';

const express = require('express');

require('dotenv').config();
const tripsRouter = express.Router();

const prisma = require('../prisma/prisma.js');

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

module.exports = tripsRouter;