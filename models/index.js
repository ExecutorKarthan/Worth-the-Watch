const Reviewer = require('./Reviewers');
const Review = require('./Reviews');

Reviewer.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Reviewer, {
  foreignKey: 'user_id',
});

module.exports = { Reviewer, Review};
