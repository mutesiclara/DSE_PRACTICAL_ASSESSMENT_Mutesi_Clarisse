const db = require('../config/db');

function calculateFee(entry, exit) {
  const hours = Math.ceil((exit - entry) / (1000 * 60 * 60));
  const amount = hours <= 1 ? 1500 : 1500 + (hours - 1) * 1000;
  return { hours, amount };
}

exports.entry = (req, res) => {
  const { vehicleid } = req.body;

  db.query(
    'INSERT INTO parking_records (vehicleid, entry_time, recordedby) VALUES (?,NOW(),?)',
    [vehicleid, req.user.userid],
    () => res.json({ message: 'Vehicle entered' })
  );
};

exports.exit = (req, res) => {
  db.query(
    'SELECT * FROM parking_records WHERE recordid=?',
    [req.params.id],
    (err, result) => {
      const record = result[0];
      const exitTime = new Date();
      const fee = calculateFee(new Date(record.entry_time), exitTime);

      db.query(
        'UPDATE parking_records SET exit_time=?, total_hours=?, total_amount=? WHERE recordid=?',
        [exitTime, fee.hours, fee.amount, req.params.id],
        () => res.json({ message: 'Vehicle exited', fee })
      );
    }
  );
};

exports.myRecords = (req, res) => {
  db.query(
    `SELECT * FROM parking_records pr
     JOIN vehicles v ON pr.vehicleid = v.vehicleid
     WHERE v.userid = ?`,
    [req.user.userid],
    (err, result) => res.json(result)
  );
};
