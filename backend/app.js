const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Goal = require('./models/goal');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/goals', async (req, res) => {
  console.log('TRYING TO FETCH GOALS');
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log('FETCHED GOALS');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load goals.' });
  }
});

app.post('/goals', async (req, res) => {
  console.log('TRYING TO STORE GOAL');
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
    console.log('STORED NEW GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save goal.' });
  }
});

app.delete('/goals/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL');
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted goal!' });
    console.log('DELETED GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
});

app.get('/', async (req, res) => {
  console.log('CHECKING HEALTH');
  try {
    res.status(200).json({
      status: 'OK'
    });
    console.log('HEALTH CHECKED');
  } catch (err) {
    console.error('ERROR CHECKING HEALTH');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to check health.' });
  }
});

const mongodbUser = process.env.MONGODB_USERNAME;
const mongodbPass = process.env.MONGODB_PASSWORD;
//const mongodbAddress = 'mongodb'; // service name, courtesy of docker-compose network
//const mongodbAddress = 'localhost'; // works on ECS if containers are in same Task
const mongodbUrl = process.env.MONGODB_URL; // we'll provide a different value when running in ECS
const mongodbPort = 27017;
const database = 'course-goals';
const fullUrl = `mongodb://${mongodbUser}:${mongodbPass}@${mongodbUrl}:${mongodbPort}/${database}?authSource=admin`;
console.log('connetting to: ' + fullUrl);
mongoose.connect(
  fullUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(80);
    }
  }
);
