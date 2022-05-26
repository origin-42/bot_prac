const router = require('express').Router();

const homeRoutes = require('./home-routes.js'); // Setup a front page
const apiRoutes = require('./api');

router.use('/', homeRoutes); // Add front page as static and setup routes for it
router.use('/api', apiRoutes); // Add api route

module.exports = router;
