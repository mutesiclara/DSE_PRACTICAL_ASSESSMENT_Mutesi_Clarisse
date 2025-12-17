const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const parkingController = require('../controllers/parking.controller');

console.log('parking.routes loaded');

// debug endpoint: list registered routes and methods
router.get('/routes', (req, res) => {
  const routes = [];
  router.stack.forEach(mw => {
    if (mw.route) {
      const methods = Object.keys(mw.route.methods).map(m => m.toUpperCase()).join(',');
      routes.push({ path: mw.route.path, methods });
    }
  });
  res.json(routes);
});

router.post('/entry', auth, role('manager'), parkingController.entry);
// allow POST for exit as well to avoid "Cannot POST /api/parking/exit/:id"
router.post('/exit/:id', auth, role('manager'), parkingController.exit);
router.put('/exit/:id', auth, role('manager'), parkingController.exit);
router.get('/my-records', auth, parkingController.myRecords);

module.exports = router;
