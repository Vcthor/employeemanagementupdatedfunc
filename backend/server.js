const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connection = require('./connection/db'); // Using your existing DB connection file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve files from the 'documents' and 'uploads' folders
app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the path for the 'uploads' folder
const uploadFolder = path.join(__dirname, 'uploads');

// Setup file storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to add an event
app.post('/api/events', upload.fields([{ name: 'document' }, { name: 'poster' }]), (req, res) => {
  const { venue, name, organization, date, duration } = req.body;
  const document = req.files.document ? req.files.document[0].filename : null;
  const poster = req.files.poster ? req.files.poster[0].filename : null;

  const query = 'INSERT INTO events (name, organization, date, duration, documents, photo, venue) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [name, organization, date, duration, document, poster, venue], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting event data' });
    }
    res.status(200).json({ message: 'Event added successfully', eventId: results.insertId });
  });
});

// GET route to fetch all events
app.get('/api/events', (req, res) => {
  const query = 'SELECT * FROM events';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ message: 'Error fetching event data' });
    }
    res.status(200).json(results);
  });
});

// Login route for users
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (results.length > 0 && results[0].password === password) {
      return res.json({ success: true, message: 'Login successful' });
    }
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  });
});

// Login route for admin
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admin WHERE adminusername = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (results.length > 0 && results[0].adminpassword === password) {
      return res.json({ success: true, message: 'Admin login successful' });
    }
    res.status(401).json({ success: false, message: 'Invalid admin username or password' });
  });
});

// Check database connection
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
