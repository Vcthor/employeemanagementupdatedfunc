const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connection = require('./connection/db');
const councilRoutes = require('./routes/route'); // Using your existing DB connection file
const app = express();
const PORT = 5000;
const fs = require('fs');
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
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });


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


// POST route to add councils
app.post('/api/councils', (req, res) => {
  const { organization, adviser, president, vicePresident, secretary, treasurer, auditor, pro, rep, representative } = req.body;

  const query = `
    INSERT INTO councils (organization, adviser, president, vicePresident, secretary, treasurer, auditor, pro, rep, representative)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [organization, adviser, president, vicePresident, secretary, treasurer, auditor, pro, rep, representative], (err, results) => {
    if (err) {
      console.error('Error inserting council data:', err);
      return res.status(500).json({ message: 'Error saving council data' });
    }
    res.status(200).json({ message: 'Council data saved successfully', councilId: results.insertId });
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

// GET route to fetch all councils
app.get('/api/councils', (req, res) => {
  const query = 'SELECT * FROM councils';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching councils:', err);
      return res.status(500).json({ message: 'Error fetching councils' });
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
      if (results.length > 0) {
          if (results[0].password === password) {
              return res.json({ success: true, message: 'Login successful' });
          } else {
              return res.status(401).json({ success: false, message: 'Incorrect password' });
          }
      } else {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
  });
});

// Login route for admin
app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt with username:', username); // Debugging line

  const query = 'SELECT * FROM admin WHERE adminuser = ?';
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    console.log('Query results:', results); // Debugging line
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


app.get('/api/images', (req, res) => {
  const imagesPath = path.join(__dirname, 'uploads');
  
  // Check if the directory exists
  if (!fs.existsSync(imagesPath)) {
    return res.status(404).send('Uploads folder not found.');
  }

  fs.readdir(imagesPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory.');
    }

    // Filter image files (e.g., .jpg, .png)
    const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    if (imageFiles.length === 0) {
      return res.status(404).send('No images found.');
    }

    // Map the file names to URLs
    const imageUrls = imageFiles.map(file => `/uploads/${file}`);
    res.json(imageUrls);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


