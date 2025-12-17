require('dotenv').config();   // 👈 ADD THIS LINE

const express = require('express');
const app = express();

app.use(express.json());

// handle invalid/malformed JSON body errors from express.json() / body-parser
app.use((err, req, res, next) => {
  // body-parser error variants: SyntaxError, type 'entity.parse.failed', or status 400
  const isBodyParserError = err && (err instanceof SyntaxError || err.type === 'entity.parse.failed' || err.status === 400);
  if (isBodyParserError) {
    console.error('Invalid JSON received:', err && err.message ? err.message : err);
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  next(err);
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/parking', require('./routes/parking.routes'));
app.use('/api/reports', require('./routes/report.routes'));
app.use('/api/vehicle', require('./routes/vehicle.routes'));

// quick health-check endpoint
app.get('/', (req, res) => res.json({ message: 'API running' }));

// DB health-check endpoint for debugging
const db = require('./config/db');
app.get('/api/status', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) {
      console.error('DB status error:', err);
      return res.status(500).json({ database: 'unreachable', error: err.message });
    }
    res.json({ database: 'ok' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
