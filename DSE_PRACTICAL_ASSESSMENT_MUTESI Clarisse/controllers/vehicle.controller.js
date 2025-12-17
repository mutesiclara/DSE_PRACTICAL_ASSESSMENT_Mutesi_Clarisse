const db = require('../config/db');

// Create a vehicle. Accepts either `userid` or `phone` to identify the owner.
// Accepts plate in multiple forms: `platenumber`, `plate`, or `plateNumber`.
exports.create = (req, res) => {
  const { platenumber, plate, plateNumber, userid, phone } = req.body;
  const plateValue = platenumber || plate || plateNumber;

  if (!plateValue || (!userid && !phone)) {
    return res.status(400).json({ message: 'plate (or platenumber) and userid or phone are required' });
  }

  // Helper to get the final userid to use
  const resolveUserId = (cb) => {
    if (userid) return cb(null, userid);

    db.query('SELECT userid FROM users WHERE phone=?', [phone], (err, result) => {
      if (err) {
        console.error('DB error (find user by phone):', err);
        return cb({ status: 500, json: { message: 'Database error' } });
      }
      if (!result || result.length === 0) {
        return cb({ status: 404, json: { message: 'User with provided phone not found' } });
      }
      return cb(null, result[0].userid);
    });
  };

  resolveUserId((errOrNull, finalUserId) => {
    if (errOrNull) return res.status(errOrNull.status).json(errOrNull.json);

    db.query(
      'INSERT INTO vehicles (platenumber, userid) VALUES (?,?)',
      [plateValue, finalUserId],
      (err, result) => {
        if (err) {
          console.error('DB error (create vehicle):', err);
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Vehicle with this plate already exists' });
          return res.status(500).json({ message: 'Database error' });
        }
        return res.status(201).json({ message: 'Vehicle added', vehicleid: result.insertId });
      }
    );
  });
};
