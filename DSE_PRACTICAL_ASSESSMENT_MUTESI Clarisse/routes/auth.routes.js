const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// alias vehicle routes under /api/auth/vehicle for compatibility
router.use('/vehicle', require('./vehicle.routes'));

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
