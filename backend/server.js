const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./connection/db');
const councilRoutes = require('./routes/route'); // Using your existing DB connection file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api', councilRoutes);



// Serve files from the 'documents' and 'uploads' folders
app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

app.get('/api/councils', async (req, res) => {
  try {
      const councils = await db.query('SELECT * FROM councils');  // Adjust query for your DB
      res.json(councils);
  } catch (error) {
      console.error('Error fetching councils:', error);
      res.status(500).json({ message: 'Error fetching councils' });
  }
});

// GET route to fetch all councils

app.get('/api/users', async (req, res) => {
  try {
      const users = await db.query('SELECT * FROM users');  // Adjust query for your DB
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
  }
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

app.post('/signup', (req, res) => {
  const { email, username, password, name } = req.body;

  // Check if all fields are provided
  if (!email || !username || !password || !name) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Prepare the query to insert user data into the users table
  const query = 'INSERT INTO users (email, username, password, name) VALUES (?, ?, ?, ?)';

  connection.query(query, [email, username, password, name], (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
      }
      // If successful, send a success response
      res.json({ success: true, message: 'User registered successfully' });
  });
});