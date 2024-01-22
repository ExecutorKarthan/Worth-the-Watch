//Import needed modules for operation
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create a review model to store review data
class Review extends Model {}

//Define the attributes for reviews in the database
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    reviewer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'reviewer',
        key: 'id',
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'movie',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

//Export the model for use
module.exports = Review;
