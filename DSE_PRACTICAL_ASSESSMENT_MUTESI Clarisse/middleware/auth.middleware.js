const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let tokenHeader = req.headers['authorization'];
  if (!tokenHeader) return res.status(401).json({ message: 'No token provided' });

  // Support both 'Bearer <token>' and raw token in the Authorization header
  const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;

  jwt.verify(token, process.env.JWT_SECRET || 'SECRETKEY', (err, decoded) => {
    if (err) {
      console.error('JWT verify error:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
