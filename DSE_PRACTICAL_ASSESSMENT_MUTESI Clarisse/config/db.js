require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
});

db.connect(err => {
  if (err) {
    // don't throw — allow server to run for debugging and show helpful message
    console.error('MySQL connection error:', err.message);
    console.warn('Continuing without database connection. Set DB env vars to connect to your MySQL server.');
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = db;
