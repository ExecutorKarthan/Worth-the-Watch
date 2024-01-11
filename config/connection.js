//Import required libraries
const Sequelize = require('sequelize');
require('dotenv').config();

//Establish database connection
//Connect to Heroku Database
if(process.env.JAWSDB_URL){
  sequelize = new Sequelize(process.env.JAWSDB_URL);
}

//If run locally, use local settings for the database
else{
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

//Export configuration data
module.exports = sequelize;