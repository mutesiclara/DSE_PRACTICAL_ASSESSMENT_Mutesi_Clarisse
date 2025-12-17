const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const vehicleController = require('../controllers/vehicle.controller');

// Only managers can add vehicles
router.post('/', auth, role('manager'), vehicleController.create);

module.exports = router;
