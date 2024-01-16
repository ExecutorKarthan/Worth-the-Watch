//Import needed dependencies
const router = require('express').Router();

const reviewerRoutes = require('./reviewer-routes');
const tmdbRoutes = require('./tmdb-routes');

//Assign paths for each needed dependency 
router.use('/reviewers', reviewerRoutes);
router.use('/tmdb', tmdbRoutes);

//Export the newly adjusted router
module.exports = router;