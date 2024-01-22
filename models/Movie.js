//Import needed modules for operation
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create a movie model to store movie data
class Movie extends Model {}

//Define the attributes for movies in the database
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poster_path: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

//Export the model for use
module.exports = Movie;