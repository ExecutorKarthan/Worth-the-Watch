const Reviewer = require('./Reviewer');
const Review = require('./Review');
const Movie = require('./Movie')

Reviewer.hasMany(Review, {
  foreignKey: 'reviewer_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Reviewer, {
  foreignKey: 'reviewer_id',
});

Movie.hasMany(Review, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Movie, {
  foreignKey: 'movie_id',
});

module.exports = { Reviewer, Review};
