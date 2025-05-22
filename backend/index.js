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
  database: 'CWSMS',
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
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const sql = "INSERT INTO users ( username, password, email) VALUES (?, ?, ?)";
    db.query(sql, [username, hashedPassword, email], (err, result) => {
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
app.get('/car', isAuthenticated, (req, res) => {
  const sql = "SELECT * FROM Car";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch users' });
    res.status(200).json(result);
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

// POST route to insert data into the database
app.post('/api/data', (req, res) => {
  const rows = req.body; // Assuming the request body is an array of rows
  
  // Prepare an array of SQL queries for each row
  const queries = rows.map((row) => {
    return new Promise((resolve, reject) => {
      const { service, carType, price } = row;
      const query = 'INSERT INTO services (service, carType, price) VALUES (?, ?, ?)';
      db.query(query, [service, carType, price], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });

  // Execute all queries concurrently
  Promise.all(queries)
    .then(() => {
      res.status(200).json({ message: 'Data inserted successfully' });
    })
    .catch((err) => {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Failed to insert data' });
    });
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT service, carType, price FROM services';
  
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(result); // Send the data as JSON response
  });
});

// Express backend
app.post('/api/car', (req, res) => {
  const {PlateNumber_id,CarType, CarSize, DriverName, PhoneNumber } = req.body;
  const sql = 'INSERT INTO Car (PlateNumber_id,CarType, CarSize, DriverName, PhoneNumber) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [PlateNumber_id,CarType, CarSize, DriverName, PhoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to insert car');
    }
    res.send({ message: 'Car inserted successfully' });
  });
});

app.post('/api/services', (req, res) => {
  const { service, carType, price } = req.body;

  const query = 'INSERT INTO services (service, carType, price) VALUES (?, ?, ?)';
  db.query(query, [service, carType, price], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Failed to add service.' });
    }
    res.status(201).json({ message: 'Service added successfully' });
  });
});

// Get all services
app.get('/api/services', (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return res.status(500).send('Error fetching services');
    }
    res.status(200).json(results);
  });
});

app.post('/records', (req, res) => {
    const { ServiceDate, PackageNumber, PlateNumber } = req.body;

    // SQL query to insert data into the ServiceRecord table
    const sql = 'INSERT INTO servicepackage(ServiceDate, PackageNumber, PlateNumber) VALUES (?, ?, ?)';
    
    db.query(sql, [ServiceDate, PackageNumber, PlateNumber], (err, result) => {
        if (err) {
            console.error('Error inserting record: ', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        res.status(200).json({ message: 'Service record added successfully!', id: result.insertId });
    });
});


app.post('/payment', (req, res) => {
    const { AmountPaid, PaymentDate, RecordNumber } = req.body;

    // Query to insert a new payment record into the database
    const sql = 'INSERT INTO Payment (AmountPaid, PaymentDate, RecordNumber) VALUES (?, ?, ?)';
    const values = [AmountPaid, PaymentDate, RecordNumber];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting payment:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        res.status(201).json({ message: 'Payment added successfully!', paymentId: result.insertId });
    });
});

app.get('/records', (req, res) => {
    db.query('SELECT * FROM servicepackage', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.get('/package', (req, res) => {
    db.query('SELECT * FROM package', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.get('/car', (req, res) => {
    db.query('SELECT * FROM Car', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.get('/care', (req, res) => {
    db.query('SELECT * FROM Car', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.get('/payments', (req, res) => {
    const sql = 'SELECT * FROM Payment';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        res.status(200).json(result);
    });
});

app.get('/payment', (req, res) => {
    const sql = 'SELECT * FROM Payment';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        res.status(200).json(result);
    });
});
// PUT record by RecordNumber (Update)
app.put('/records/:recordNumber', (req, res) => {
    const { recordNumber } = req.params;
    const { ServiceDate, PackageNumber, PlateNumber } = req.body;

    const sql = 'UPDATE ServiceRecord SET ServiceDate = ?, PackageNumber = ?, PlateNumber = ? WHERE RecordNumber = ?';
    const values = [ServiceDate, PackageNumber, PlateNumber, recordNumber];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ message: 'Record updated successfully!' });
    });
});
// ✅ PUT update a record
app.put('/records/:RecordNumber_id', (req, res) => {
    const { RecordNumber_id } = req.params;
    const { ServiceDate, PackageNumber, PlateNumber } = req.body;

    const sql = 'UPDATE  servicepackage SET ServiceDate = ?, PackageNumber = ?, PlateNumber = ? WHERE RecordNumber_id = ?';
    db.query(sql, [ServiceDate, PackageNumber, PlateNumber, RecordNumber_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Update error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.json({ message: 'Record updated successfully!' });
    });
});

// ✅ DELETE a service record
app.delete('/records/:RecordNumber_id', (req, res) => {
    const { RecordNumber_id } = req.params;
    db.query('DELETE FROM  servicepackage WHERE RecordNumber_id = ?', [RecordNumber_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Delete error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.json({ message: 'Record deleted successfully!' });
    });
});

app.get('/combined-report', async (req, res) => {
  try {
    con.query(`
      SELECT 
        c.PlateNumber,
        p.PackageName,
        p.PackageDescription,
        p.AmountPaid,
        p.PaymentDate,
      FROM Car c
      JOIN Package p ON c.PlateNumber = p.PackageName
      JOIN Payment p ON c.PackageDescription = p.AmountPaid
      ORDER BY p.PaymentDate DESC
    `, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error generating report' });
      }

      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unexpected server error' });
  }
});

app.get('/api/employees', (req, res) => {
  con.query('SELECT * FROM Car', (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database query error' })
    }
    res.json(results)
  })
})

// Get a service record by ID
app.get('/Update/:RecordNumber_id', (req, res) => {
  const RecordNumber_id = req.params.RecordNumber_id;
  const query = 'SELECT * FROM servicepackage WHERE RecordNumber_id = ?';

  db.query(query, [RecordNumber_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result[0]);
  });
});

app.get('/service-records/:RecordNumber_id', (req, res) => {
  const RecordNumber_id = req.params.RecordNumber_id;
  const query = 'SELECT * FROM servicepackage WHERE RecordNumber_id = ?';

  db.query(query, [RecordNumber_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result[0]);
  });
});


// Update a service record
app.put('/Update/:RecordNumber_id', (req, res) => {
  const  RecordNumber_id = req.params.RecordNumber_id;
  const { ServiceDate, PackageNumber, PlateNumber } = req.body;

  // Ensure that the required fields are present
  if (!ServiceDate || !PackageNumber || !PlateNumber) {
    return res.status(400).json({ error: 'All fields (ServiceDate, PackageNumber, PlateNumber) are required' });
  }

  const query = `
    UPDATE servicepackage
    SET ServiceDate = ?, PackageNumber = ?, PlateNumber = ?
    WHERE  RecordNumber_id = ?
  `;

  // Perform the update query
  db.query(query, [ServiceDate, PackageNumber, PlateNumber,  RecordNumber_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Update failed, please try again later' });
    }

    // If no rows were affected, it means the record with that ID doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service record not found' });
    }

    // Success response
    res.json({ message: 'Service record updated successfully' });
  });
});

app.put('/Package/:RecordNumber_id', (req, res) => {
  const  RecordNumber_id = req.params.RecordNumber_id;
  const { ServiceDate, PackageNumber, PlateNumber } = req.body;

  // Ensure that the required fields are present
  if (!ServiceDate || !PackageNumber || !PlateNumber) {
    return res.status(400).json({ error: 'All fields (ServiceDate, PackageNumber, PlateNumber) are required' });
  }

  const query = `
    UPDATE servicepackage
    SET ServiceDate = ?, PackageNumber = ?, PlateNumber = ?
    WHERE  RecordNumber_id = ?
  `;

  // Perform the update query
  db.query(query, [ServiceDate, PackageNumber, PlateNumber,  RecordNumber_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Update failed, please try again later' });
    }

    // If no rows were affected, it means the record with that ID doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service record not found' });
    }

    // Success response
    res.json({ message: 'Service record updated successfully' });
  });
});

app.put('/updatecar/:PlateNumber_id', (req, res) => {
  const  PlateNumber_id  = req.params.PlateNumber_id ;
  const {CarType,	CarSize, DriverName,PhoneNumber } = req.body;

  // Ensure that the required fields are present
  if (!CarType || !CarSize || !DriverName || !PhoneNumber) {
    return res.status(400).json({ error: 'All fields (ServiceDate, PackageNumber, PlateNumber) are required' });
  }

  const query = `
    UPDATE Car
    SET CarType = ?, CarSize  = ?, DriverName = ?, PhoneNumber = ?
    WHERE  PlateNumber_id  = ?
  `;

  // Perform the update query
  db.query(query, [CarType, CarSize, DriverName,PhoneNumber,  PlateNumber_id ], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Update failed, please try again later' });
    }

    // If no rows were affected, it means the record with that ID doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service record not found' });
    }

    // Success response
    res.json({ message: 'Service record updated successfully' });
  });
});

app.delete('/Package/:PackageNumber', (req, res) => {
    const { 	PackageNumber } = req.params;
    db.query('DELETE FROM packages WHERE 	PackageNumber = ?', [	PackageNumber], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Delete error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.json({ message: 'Record deleted successfully!' });
    });
});

app.delete('/deletecar/:PlateNumber_id', (req, res) => {
    const { 	PlateNumber_id } = req.params;
    db.query('DELETE FROM Car WHERE 	PlateNumber_id = ?', [PlateNumber_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Delete error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.json({ message: 'Record deleted successfully!' });
    });
});

app.delete('/deleteservice/:id', (req, res) => {
    const { 	id } = req.params;
    db.query('DELETE FROM services WHERE 	id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Delete error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.json({ message: 'Record deleted successfully!' });
    });
});

app.put('/updateservice/:id', (req, res) => {
  const  id  = req.params.id ;
  const {service,carType,price } = req.body;

  // Ensure that the required fields are present
  if (!service || !carType || !price) {
    return res.status(400).json({ error: 'All fields (ServiceDate, PackageNumber, PlateNumber) are required' });
  }

  const query = `
    UPDATE services
    SET service = ?, carType  = ?, price = ?
    WHERE  id  = ?
  `;

  // Perform the update query
  db.query(query, [service,carType,price,id ], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Update failed, please try again later' });
    }

    // If no rows were affected, it means the record with that ID doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service record not found' });
    }

    // Success response
    res.json({ message: 'Service record updated successfully' });
  });
});

app.get('/updateservice/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM services WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result[0]);
  });
});

app.get('/updatecar/:PlateNumber_id', (req, res) => {
  const PlateNumber_id = req.params.PlateNumber_id;
  const query = 'SELECT * FROM Car WHERE PlateNumber_id = ?';

  db.query(query, [PlateNumber_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result[0]);
  });
});
// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
