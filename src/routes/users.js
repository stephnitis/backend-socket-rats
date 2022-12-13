'use strict';

const express = require('express');
const { password } = require('pg/lib/defaults.js');

require('dotenv').config();
const userRouter = express.Router();

const prisma = require('../prisma/prisma.js');

userRouter.post('/users', async (req, res) => {
  try {
    const {name, password, contact, emergencyContact} = req.body;
    const newUser = await prisma.User.create({
      data: {
        name: name,
        password: password,
        contact: contact,
        emergencyContact: emergencyContact,
        // trips: {
        //   connectOrCreate: trips.map((trip) => ({
        //     where: {
        //       name: trip,
        //     },
        //     create: {
        //       name: trip
        //     }
        //   }))
        // }
      }
    });
    res.status(201).json({newUser});
  } catch (e) {
    console.log(e);
  }
});
  
userRouter.get('/users', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    let result = {
      data: {
        results: allUsers,
      }
    }
    res.send(result)
  } catch (e) {
    console.log(e);
  }
});


module.exports = userRouter;