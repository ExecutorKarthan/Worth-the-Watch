//Import router from express for use
const router = require('express').Router();

//Define the route paths for the home and api
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//Export the router for use
module.exports = router;