const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');  // Import express-session

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Secret for signing the session ID
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Use 'secure: true' if you're using HTTPS
}));

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Running on ${port}`);
  }
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
});

app.get('/databa', (req, res) => {
  const select = "SELECT * FROM `users`";
  db.query(select, (err, result) => {
    if (err) {
      res.status(400).json({ Message: 'Error to connect' });
    } else {
      res.send(result);
    }
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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const value = [username, password];
  const sql = "SELECT * FROM `users` WHERE username = ? AND password = ?";
  db.query(sql, value, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        // Session data is stored
        req.session.loggedin = true;
        req.session.username = username;
        return res.status(200).json({ loggedin: true });
      }
    }
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

app.post('/insert', (req, res) => {
  const { names, email, username, password } = req.body;
  const values = [names, email, username, password];
  const sql = "INSERT INTO `users`( `names`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)";
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
    }
    else{
        res.send(data)
    }
  });
});

// PUT: Update user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { names, email, username, password } = req.body;

  const sql = 'UPDATE users SET names = ?, email = ?, username = ?, password = ? WHERE id = ?';
  const values = [names, email, username, password, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// GET: Get single user by ID (for pre-filling the form)
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result[0]); // Send user data
  });
});
