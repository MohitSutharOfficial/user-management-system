const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
  host: 'root@localhost',
  user: 'root', // change this to your MySQL username
  password: 'mohit@9462165668', // change this to your MySQL password
  database: 'user_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Routes
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).send('Error saving user');
      res.status(200).send('User signed up successfully');
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send('Error fetching user');
    if (results.length === 0) return res.status(404).send('User not found');

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing password');
      if (!isMatch) return res.status(400).send('Invalid credentials');

      const token = jwt.sign({ userId: results[0].id }, 'secret_key');
      res.status(200).send({ message: 'Login successful', token });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
