//Import needed dependencies
const router = require('express').Router();

// Import routes from review, reviewer, and TMDB
const reviewRoutes = require('./review-routes');
const reviewerRoutes = require('./reviewer-routes');
const tmdbRoutes = require('./tmdb-routes');

//Assign paths for each needed dependency 
router.use('/review', reviewRoutes);
router.use('/reviewers', reviewerRoutes);
router.use('/tmdb', tmdbRoutes);

//Export the newly adjusted router
module.exports = router;