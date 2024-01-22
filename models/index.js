//Import needed modules for operation
const Reviewer = require('./Reviewer');
const Review = require('./Review');
const Movie = require('./Movie')

//Create links allowing reviews to contain movie ids for their corresponding movies
Review.belongsTo(Movie, {
  foreignKey: 'movie_id',
});

Movie.hasMany(Review, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE'
});

//Create links allowing reviews to contain reviewer ids for their corresponding reviewers
Review.belongsTo(Reviewer, {
  foreignKey: 'reviewer_id',
});

Reviewer.hasMany(Review, {
  foreignKey: 'reviewer_id',
  onDelete: 'CASCADE'
});

//Export the model for use
module.exports = { Movie, Reviewer, Review};