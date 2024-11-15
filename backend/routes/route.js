// routes/route.js
const express = require('express');
const router = express.Router();
const connection = require('../connection/db');  // import the database connection

// Create a new event
router.post('/events', (req, res) => {
  const { name, date, time, organization, documents } = req.body;
  const query = 'INSERT INTO events (name, date, time, organization, documents) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [name, date, time, organization, documents], (err, results) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(201).send({ id: results.insertId, name, date, time, organization, documents });
  });
});

// Get all events
router.get('/events', (req, res) => {
  const query = 'SELECT * FROM events';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(results);
  });
});

// Get all councils
router.get('/councils', (req, res) => {
  const query = 'SELECT * FROM councils';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching councils:', err);
      return res.status(500).json({ message: 'Server Error' });
    }
    res.status(200).json(results);
  });
});

// Get all users
router.get('/users', (req, res) => {
  const sqlQuery = 'SELECT * FROM users';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Server Error');
    }
    res.json(results);
  });
});




module.exports = router;
