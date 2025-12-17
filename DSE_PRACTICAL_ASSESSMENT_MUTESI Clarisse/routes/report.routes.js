const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const reportController = require('../controllers/report.controller');

router.get('/daily', auth, role('manager'), reportController.daily);
router.get('/monthly', auth, role('manager'), reportController.monthly);

module.exports = router;
