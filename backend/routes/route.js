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

//delete
router.delete('/api/events/:id', async (req, res) => {
  console.log('Delete route hit with ID:', req.params.id)
  const { id } = req.params;

  try {
      const result = await db.query('DELETE FROM events WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event' });
  }
});



















module.exports = router;
