//Import needed dependencies
const router = require('express').Router();
const userRoutes = require('./reviewer-routes');

//Assign paths for each needed dependency 
router.use('/reviewers', userRoutes);

//Export the newly adjusted router
module.exports = router;