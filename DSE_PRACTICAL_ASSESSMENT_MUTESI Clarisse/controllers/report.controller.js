const db = require('../config/db');

exports.daily = (req, res) => {
  db.query(
    'SELECT DATE(exit_time) AS day, SUM(total_amount) AS revenue FROM parking_records GROUP BY day',
    (err, result) => res.json(result)
  );
};

exports.monthly = (req, res) => {
  db.query(
    'SELECT MONTH(exit_time) AS month, SUM(total_amount) AS revenue FROM parking_records GROUP BY month',
    (err, result) => res.json(result)
  );
};
