const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullname, phone, role, password } = req.body;
    if (!fullname || !phone || !role || !password) {
      return res.status(400).json({ message: 'fullname, phone, role and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (fullname, phone, role, password) VALUES (?,?,?,?)',
      [fullname, phone, role, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('DB error (register):', err);
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Phone already exists' });
          }
          return res.status(500).json({ message: 'Database error' });
        }
        return res.status(201).json({ message: 'User registered successfully', userid: result.insertId });
      }
    );
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: 'phone and password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE phone=?',
    [phone],
    async (err, result) => {
      if (err) {
        console.error('DB error (login):', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (!result || result.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Wrong password' });
      }

      const token = jwt.sign(
        { userid: user.userid, role: user.role },
        process.env.JWT_SECRET || 'SECRETKEY',
        { expiresIn: '8h' }
      );

      res.json({ token });
    }
  );
};

