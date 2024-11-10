const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;
const connection = require('./connection/db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/documents', express.static(path.join(__dirname, 'documents')));
const express = require('express');
const path = require('path');


// Serve files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define the path for the 'uploads' folder
const uploadFolder = path.join(__dirname, 'uploads/');

// Setup file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Use the dynamic path for the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST route to add event
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
    res.status(200).json({ message: 'Event added successfully', event: results });
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
    res.status(200).json(results); // Send the list of events as the response
  });
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your actual username
  password: '', // Replace with your actual password
  database: 'school_event_management', // Replace with your actual database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (results.length > 0) {
      const user = results[0];
      if (user.password === password) {
        return res.json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// Admin login route
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM admin WHERE adminusername = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (results.length > 0) {
      const admin = results[0];
      if (admin.adminpassword === password) {
        return res.json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid admin username or password' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin username or password' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
