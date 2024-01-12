//Import needed dependencies
const router = require('express').Router();
const userRoutes = require('./reviewer-routes');
const reviewRoutes = require('./review-routes');
//Assign paths for each needed dependency 
router.use('/reviewers', userRoutes);
router.use('/reviews', reviewRoutes);

//Export the newly adjusted router
module.exports = router;