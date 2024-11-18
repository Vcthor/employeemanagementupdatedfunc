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





router.get('/events', (req, res) => {
  const { date } = req.query;
  const query = `SELECT organization, venue, date, duration, name FROM events WHERE date = ?`;
  connection.query(query, [date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching events' });
    }
    res.status(200).json(results);
  });
});


// Get all councils
router.get('/councils', (req, res) => {
  const query = 'SELECT * FROM councils';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching councils' });
    }
    res.status(200).json(results);
  });
});

router.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Delete request received for event ID:', id);  // Log the incoming ID

  try {
      const result = await db.query('DELETE FROM events WHERE id = ?', [id]);
      console.log('Delete result:', result);  // Log the result of the deletion

      if (result.affectedRows > 0) {
          res.status(200).send('Event deleted successfully');
      } else {
          res.status(404).send('Event not found');
      }
  } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).send('Internal server error');
  }
});







module.exports = router;
