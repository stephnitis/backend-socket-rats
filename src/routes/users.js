'use strict';

const express = require('express');

require('dotenv').config();
const userRouter = express.Router();

const prisma = require('../prisma/prisma.js');

userRouter.post('/users', async (req, res) => {
  try {
    const { name, password, contact, emergencyContact } = req.body;
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
    res.status(201).json({ newUser });
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
    res.status(200).send(result)
  } catch (e) {
    console.log(e);
  }
});

userRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
});

userRouter.put('/users/:id', async (req, res) => {
  try {
    const updatedInfo = await prisma.user.update({
      where: {
        id: String(req.params.id),
      },
      data: {
        name: req.body.name || undefined,
        password: req.body.password || undefined,
        email: req.body.email || undefined,
        birthday: req.body.birthday || undefined,
        contact: req.body.contact || undefined,
        emergencyContact: req.body.emergencyContact || undefined,
        insuranceProvider: req.body.insuranceProvider || undefined,
        medications: req.body.medications || undefined,
        allergies: req.body.allergies || undefined,
        communicationDifficulties: req.body.communicationDifficulties || undefined,
        preferredTreatments: req.body.preferredTreatments || undefined,
      }
    })
    res.json(updatedInfo);
  } catch (e) {
    console.log(e);
  }
})

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).send('user account deleted');
  } catch (e) {
    console.log(e);
  }
});



module.exports = userRouter;