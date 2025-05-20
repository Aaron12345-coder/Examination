const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 8000;

// Middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// Session config
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true when using HTTPS in production
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: 'lax' // 1 hour
  },
}));

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
});

// Middleware: Check session
function isAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// ROUTES

// Register
app.post('/insert', (req, res) => {
  const { names, email, username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const sql = "INSERT INTO users (names, email, username, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [names, email, username, hashedPassword], (err, result) => {
      if (err) return res.status(400).json({ message: 'Error inserting data' });
      res.status(200).json({ message: 'User created successfully' });
    });
  });
});

// Login

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, data) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (data.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    bcrypt.compare(password, data[0].password, (err, result) => {
      if (err) return res.status(500).json({ message: 'Password comparison error' });

      if (result) {
        req.session.loggedin = true;
        req.session.username = username;
        return res.status(200).json({ message: 'Login successful', loggedin: true });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

// Get all users (protected)
app.get('/databa', isAuthenticated, (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch users' });
    res.status(200).json(result);
  });
});

// Get user by ID
app.get('/users/:id', isAuthenticated, (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch user' });
    if (result.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result[0]);
  });
});

// Update user
app.put('/users/:id', isAuthenticated, (req, res) => {
  const userId = req.params.id;
  const { names, email, username, password } = req.body;

  let hashedPassword = password;
  if (password) {
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) return res.status(500).json({ message: 'Error hashing password' });
      hashedPassword = hashed;
    });
  }

  const sql = "UPDATE users SET names = ?, email = ?, username = ?, password = ? WHERE id = ?";
  const values = [names, email, username, hashedPassword, userId];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update user' });
    res.json({ message: 'User updated successfully' });
  });
});

// ✅ GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user by ID:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const del = "DELETE FROM `users` WHERE id = ?";
  db.query(del, [id], (err) => {
    if (err) {
      throw err;
    } else {
      console.log("User deleted");
      res.status(200).json({ message: 'User deleted' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
